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

const useStorageState = (key, initalState) => {
  const [value, setValue] = React.useState(localStorage.getItem(key) || initalState);


React.useEffect(() => {
  localStorage.setItem(key, value);
}, [value, key]);

  return [value, setValue];
}


const initalStories = [
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

const getAsyncStories = () => 
  new Promise((resolve) =>
  setTimeout(
    () => resolve({ data: { stories: initalStories} }),
    2000
  )
);


const App = () => {
  


  const [searchTerm, setSearchTerm] = useStorageState('search', 'React');
  const [stories, setStories] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);


  React.useEffect(() => {
    setIsLoading(true);
    getAsyncStories().then(result => {
      setStories(result.data.stories);
      setIsLoading(false);
    })
    .catch(() => setIsError(true));
  }, []);

  const handleRemoveStory = (item) => {
    const newStories = stories.filter((story) => item.objectID !== story.objectID);
    setStories(newStories);
  }

  const handleSearch = (event) => { 
    setSearchTerm(event.target.value);
  };

  const searchStories = stories.filter((story) => 
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


  if(isLoading){
    return <p>Loading...</p>
  }

  return(
    <div>
      <h1>My Hacker Stories</h1>
      <InputWithLabel id="search" value={searchTerm} isFocused onInputChange={handleSearch}><strong>Search:</strong> </InputWithLabel>
      <hr />

      {isError && <p>Something went wrong...</p>}
      
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <List list={searchStories} onRemoveItem={handleRemoveStory}/>
      )}
    </div>
  );
}

const InputWithLabel = ({id, value, type = 'text', onInputChange, isFocused, children}) => {
  const inputRef = React.useRef();

  React.useEffect(()=> {
    if(isFocused && inputRef.current){
      inputRef.current.focus();
    }
  }, [isFocused]);

  return(
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input id={id} type={type} value={value} autoFocus={isFocused} onChange={onInputChange}/>
    </>
  );
};


const List = ({list, onRemoveItem}) =>(
    <ul>
      {list.map(({objectID, item}) => (
        <Item 
        key={objectID} item={item} onRemoveItem={onRemoveItem}/>
      ))}
    </ul>
);

const Item = ({item , onRemoveItem}) => (
  <li>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span> {item.author}</span>
    <span> {item.num_comments}</span>
    <span> {item.points}</span>
    <span>
      <button type='button' onClick ={() => onRemoveItem=(item)}>Dismiss</button>
    </span>
  </li>
);

  
  

const Search = ({search, onSearch}) =>{
  return(
    <>
      <label htmlFor='search'>Search: </label>
      <input id='search' type="text" value={search} onChange={onSearch}/>
    </>
  );
}




export default App;