import React,{Component} from 'react';
import Routes from './routes';
import Home from './Pages/Home'
import { Header, Footer } from './Layout';
import './Styles/App.css';

// const App = () => (
//   <div>
//     <Header />
//       <Routes exact path="/" component={Home}/>
//     <Footer />
//   </div>
// );
class App extends Component{
  render(){
    return(
      <div>
        <Header />
        <Routes exact path="/" component={Home}/>
        <Footer />
      </div>
    )
  }
}
export default App;
