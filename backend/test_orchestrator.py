from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_inbox_insufficient_liquidity():
    response = client.get("/api/orchestrator/inbox")
    assert response.status_code == 200
    data = response.json()
    assert "alerts" in data
    assert any(a["title"].startswith("Upcoming EMI") for a in data["alerts"]), "Action Inbox should flag an insufficient liquidity alert for EMI."
    for a in data["alerts"]:
        assert "amount" in a
        assert "due_date" in a
        assert "priority" in a

def test_valuations():
    response = client.get("/api/orchestrator/valuations")
    assert response.status_code == 200
    assets = response.json().get("assets", [])
    for a in assets:
        assert "current_value" in a
        assert type(a["current_value"]) in (int, float)

def test_liabilities():
    response = client.get("/api/orchestrator/liabilities")
    assert response.status_code == 200
    data = response.json()
    assert "liabilities" in data

def test_goals():
    # 1. Fetch initial goals
    res = client.get("/api/orchestrator/goals")
    assert res.status_code == 200
    data = res.json()
    assert "goals" in data
    
    # 2. Add a new goal
    new_goal = {
        "name": "Test Vacation",
        "target_amount": 5000,
        "current_saved": 1500,
        "target_date": "2027-06-01"
    }
    save_res = client.post("/api/orchestrator/goals", json=new_goal)
    assert save_res.status_code == 200
    assert save_res.json()["status"] == "success"
    
    # 3. Verify it appears
    res_after = client.get("/api/orchestrator/goals")
    goals = res_after.json()["goals"]
    assert any(g["name"] == "Test Vacation" for g in goals)

def test_save_liability():
    new_lib = {
        "name": "Car Loan",
        "total_amount": 15000,
        "apr": 7.5,
        "monthly_emi": 350,
        "next_due_date": "2026-09-15",
        "autopay_enabled": True
    }
    res = client.post("/api/orchestrator/liabilities", json=new_lib)
    assert res.status_code == 200
    assert res.json()["status"] == "success"
    
    res_after = client.get("/api/orchestrator/liabilities")
    libs = res_after.json()["liabilities"]
    assert any(l["name"] == "Car Loan" for l in libs)

def test_resolve_inbox():
    # Fetch inbox
    inbox = client.get("/api/orchestrator/inbox").json()
    if inbox["alerts"]:
        target_title = inbox["alerts"][0]["title"]
        res = client.post("/api/orchestrator/inbox/resolve", json={"title": target_title})
        assert res.status_code == 200
        assert res.json()["status"] == "resolved"
        
        # Verify resolved
        inbox_after = client.get("/api/orchestrator/inbox").json()
        assert all(a["title"] != target_title for a in inbox_after["alerts"])

def test_timeline_scrubber_and_stress_test():
    # 0. Base scenario
    res_base = client.post("/api/orchestrator/scrubber", json={"months_offset": 0, "stress_test_drop": 0})
    val_base = res_base.json()["projected_assets"]
    
    # 1. Timeline Scrub Forward 2 Years
    res1 = client.post("/api/orchestrator/scrubber", json={"months_offset": 24, "stress_test_drop": 0})
    assert res1.status_code == 200
    val1 = res1.json()["projected_assets"]
    assert len(val1) > 0, "Valuations should recompute for scrub forward."
    # With 0.01 * 24, multiplier is 1.24
    if val_base[0]["projected_value"] > 0:
        assert val1[0]["projected_value"] > val_base[0]["projected_value"]
        import math
        assert math.isclose(val1[0]["projected_value"], val_base[0]["projected_value"] * 1.24)
    
    # 2. Stress Test Trigger
    res2 = client.post("/api/orchestrator/scrubber", json={"months_offset": 0, "stress_test_drop": 30})
    assert res2.status_code == 200
    val2 = res2.json()["projected_assets"]
    
    # Check if value dropped by 30% compared to base
    if val_base[0]["projected_value"] > 0:
        assert val2[0]["projected_value"] < val_base[0]["projected_value"], "Projected value should drop on stress test."
        assert math.isclose(val2[0]["projected_value"], val_base[0]["projected_value"] * 0.7)


