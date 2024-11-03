import React, { useState } from 'react';
import ParticipantsList from './components/ParticipantsList';
import './App.css';

const App = () => {
  const [participants, setParticipants] = useState([]);
  const [shoppingLists, setShoppingLists] = useState([]);
  const [newListName, setNewListName] = useState('');
  const [newItem, setNewItem] = useState('');
  const [newParticipantName, setNewParticipantName] = useState('');
  const [selectedListId, setSelectedListId] = useState(null); 

  const ownerId = 1;
  const currentUserId = ownerId;

  const handleAddParticipant = () => {
    if (!newParticipantName.trim()) return;
    const newParticipant = {
      id: Date.now(),
      name: newParticipantName,
      isOwner: participants.length === 0,
    };
    setParticipants([...participants, newParticipant]);
    setNewParticipantName('');
  };

  const handleRemoveParticipant = (participantId) => {
    setParticipants(participants.filter((participant) => participant.id !== participantId));
  };

  const handleAddNewList = () => {
    if (!newListName.trim()) return;
    const newList = {
      id: Date.now(),
      name: newListName,
      items: [],
      isArchived: false,
    };
    setShoppingLists([...shoppingLists, newList]);
    setNewListName('');
    setSelectedListId(newList.id); 
  };

  const handleSelectList = (listId) => {
    setSelectedListId(listId); 
  };

  const handleAddItem = () => {
    if (!newItem.trim() || !selectedListId) return;
    const updatedLists = shoppingLists.map((list) =>
      list.id === selectedListId ? { ...list, items: [...list.items, { name: newItem, completed: false }] } : list
    );
    setShoppingLists(updatedLists);
    setNewItem('');
  };

  const handleRemoveItem = (itemIndex) => {
    if (!selectedListId) return;
    const updatedLists = shoppingLists.map((list) =>
      list.id === selectedListId ? { ...list, items: list.items.filter((_, index) => index !== itemIndex) } : list
    );
    setShoppingLists(updatedLists);
  };

  const handleToggleItemCompletion = (itemIndex) => {
    if (!selectedListId) return;
    const updatedLists = shoppingLists.map((list) =>
      list.id === selectedListId
        ? {
            ...list,
            items: list.items.map((item, index) =>
              index === itemIndex ? { ...item, completed: !item.completed } : item
            ),
          }
        : list
    );
    setShoppingLists(updatedLists);
  };

  const handleToggleArchiveList = (listId) => {
    const updatedLists = shoppingLists.map((list) =>
      list.id === listId ? { ...list, isArchived: !list.isArchived } : list
    );
    setShoppingLists(updatedLists);
    if (listId === selectedListId) setSelectedListId(null); 
  };

  // Новый обработчик для удаления списка
  const handleDeleteList = (listId) => {
    setShoppingLists(shoppingLists.filter((list) => list.id !== listId));
    if (listId === selectedListId) setSelectedListId(null); // Сбросить выбранный список, если он был удален
  };

  const selectedList = shoppingLists.find((list) => list.id === selectedListId);

  return (
    <div className="App">
      <h1>Shopping List</h1>
      <div className="container">

        {/* Left Column - Shopping lists at the top and participants at the bottom */}
        <div className="sidebar">
          <h2>Shopping Lists</h2>
          <input
            type="text"
            placeholder="New list name"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
          />
          <button onClick={handleAddNewList}>Add New List</button>

          <div className="lists-container">
            {shoppingLists.map((list) => (
              <div
                key={list.id}
                className={`list-item ${list.id === selectedListId ? 'selected' : ''}`}
                onClick={() => handleSelectList(list.id)}
              >
                <span>{list.name}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleArchiveList(list.id);
                  }}
                  className="archive-button"
                >
                  {list.isArchived ? 'Unarchive' : 'Archive'}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteList(list.id);
                  }}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          <h2>Participants</h2>
          {currentUserId === ownerId && (
            <div className="participant-form">
              <input
                type="text"
                placeholder="New participant name"
                value={newParticipantName}
                onChange={(e) => setNewParticipantName(e.target.value)}
              />
              <button onClick={handleAddParticipant}>Add Participant</button>
            </div>
          )}
          <ParticipantsList
            ownerId={ownerId}
            participants={participants}
            currentUserId={currentUserId}
            onRemoveParticipant={handleRemoveParticipant}
          />
        </div>

        {/* Center Column - Only content of the selected list */}
        <div className="main-content">
          {selectedList && (
            <div className={`shopping-list ${selectedList.isArchived ? 'archived' : ''}`}>
              <h3>{selectedList.name}</h3>
              {!selectedList.isArchived && (
                <>
                  <input
                    type="text"
                    placeholder="Enter item"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                  />
                  <button onClick={handleAddItem}>Add Item</button>
                </>
              )}
              <ul>
                {selectedList.items.map((item, index) => (
                  <li key={index} className="shopping-item">
                    <span style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
                      {item.name}
                    </span>
                    {!selectedList.isArchived && (
                      <div className="item-actions">
                        <button onClick={() => handleToggleItemCompletion(index)}>
                          {item.completed ? 'Undo' : 'Done'}
                        </button>
                        <button onClick={() => handleRemoveItem(index)}>Delete</button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default App;
