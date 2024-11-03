import React from 'react';

function ShoppingListItem({ item, onToggleResolved, onDelete }) {
  return (
    <li style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px', borderBottom: '1px solid #ddd' }}>
      <span style={{ textDecoration: item.resolved ? 'line-through' : 'none' }}>
        {item.name}
      </span>

      <div>
        <button onClick={() => onToggleResolved(item.id)} style={{ marginRight: '10px', backgroundColor: 'green', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>
          {item.resolved ? 'Cancel' : 'Done'}
        </button>
        <button onClick={() => onDelete(item.id)} style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>
          delete
        </button>
      </div>
    </li>
  );
}

export default ShoppingListItem;
