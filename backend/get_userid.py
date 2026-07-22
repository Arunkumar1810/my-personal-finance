from kite_client import authenticate_kite

kite = authenticate_kite()
if kite:
    try:
        profile = kite.profile()
        print(f"USERID_SUCCESS: {profile.get('user_name')} ({profile.get('user_id')})")
    except Exception as e:
        print(f"USERID_ERROR: {e}")
else:
    print("USERID_ERROR: Could not authenticate.")
