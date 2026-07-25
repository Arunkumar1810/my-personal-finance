import React from 'react';
import { PositionsTable, Position } from './PositionsTable';
import { PositionCard } from './PositionCard';

interface PositionsListProps {
  positions: Position[];
}

export const PositionsList: React.FC<PositionsListProps> = ({ positions }) => {
  return (
    <div className="w-full">
      {/* Desktop View */}
      <PositionsTable positions={positions} />
      
      {/* Mobile View */}
      <div className="md:hidden flex flex-col gap-3">
        {positions.map((position) => (
          <PositionCard key={position.id} position={position} />
        ))}
      </div>
    </div>
  );
};
