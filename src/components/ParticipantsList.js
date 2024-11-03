import React from 'react';

const ParticipantsList = ({ ownerId, participants, currentUserId, isArchived, onRemoveParticipant, onLeaveList }) => {
  return (
    <div className="participants-list">
      <h2>Participant</h2>
      <ul>
        {participants.map((participant) => (
          <li key={participant.id}>
            {participant.name} {participant.id === ownerId ? '(Owner)' : ''}
            {!isArchived && currentUserId === ownerId && participant.id !== ownerId && (
              <button onClick={() => onRemoveParticipant(participant.id)}>Delete</button>
            )}
            {!isArchived && participant.id === currentUserId && (
              <button onClick={onLeaveList}>Exit</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParticipantsList;
