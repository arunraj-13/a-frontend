import './bootstrap.min.css'
import Footer from './Components/footer';
import Header from './Components/header'
import Query from './Components/query_form';
import { BrowserRouter as Router,Route, Routes, Navigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Result from './Components/result';


function App() {
  const reduxQuestion = useSelector((state) => state.questionUpdate.value)

  return (
    <div className="App">
      <Router>
        <Header />
        <main ms-2 me-2>
            <Routes>
              <Route path="/" element = {<Query />} />
              <Route path="/result" element = {<Result />} /> 
            </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
