import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function Root() {
  return (
    <div>
      <h1>My App</h1>
      <nav>
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contacts">Contact</Link></li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
