import React, { useState } from 'react';
import './App.css'
import AddVisitor from './Components/AddVisitor/AddVisitor';
import VisitorList from './Components/VisitroList/VisitorList';

function App() {

  const [refresh, setRefresh] = useState(true)

  return (
    <div className="App">
      <header>
          <p>Application</p>
      </header>
      <main>
            <div className='add-visitor'>
            <AddVisitor refresh={refresh} setRefresh={setRefresh} />
            </div>
            <div className='visitor-list'>
            <VisitorList refresh={refresh}/>
            </div>
      </main>
    </div>
  );
}

export default App;
