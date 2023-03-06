import * as React from 'react';


// eslint-disable-next-line no-unused-vars
class Person{
  constructor(firstName, lastName){
    this.firstName = firstName;
    this.lastName = lastName;
  }

  getName(){
    return this.firstName + ' ' + this.lastName;
  }
}

const App = () => {
  const stories = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://reactjs.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];


  const [searchTerm, setSearchTerm] = React.useState('React');
  const handleSearch = (event) => setSearchTerm(event.target.value);

  const searchStories = stories.filter((story) => 
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return(
    <div>
      <h1>My Hacker Stories</h1>
      <Search search={handleSearch} onSearch={handleSearch}/>
      <hr />

      <List list={searchStories}/>
    </div>
  );
}

const List = (props) =>(
    <ul>
      {props.list.map((item) => (
        <Item key={item.objectID} item={item} />
      ))}
    </ul>
);

const Item = (props) => (
  <li>
    <span>
      <a href={props.item.url}>{props.item.title}</a>
    </span>
    <span> {props.item.author}</span>
    <span> {props.item.num_comments}</span>
    <span> {props.item.points}</span>
  </li>
  );
  
  

const Search = (props) =>{
  const [searchTerm, setSearchTerm] = React.useState('');

  
  const handleChange = (event) =>{
  setSearchTerm(event.target.value);
  props.onSearch(event);

  };

  return(
    <div>
      <label htmlFor='search'>Search: </label>
      <input id='search' type="text" onChange={props.onSearch}/>

      <p>
        Searching for <strong>{searchTerm}</strong>
      </p>
    </div>
  );
}




export default App;