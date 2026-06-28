function App() {

  function greet(name) {
    alert(`Hi, how are you ${name}?`);
  }

  let name = "Stephen";

  return (
    <>
      <h1>Hello {name}</h1>
      <p>This is my first React statement.</p>
      <p>I can't believe how it refreshes automatically</p>
      <button onClick={() => greet(name)}>My first button!</button>
    </>
  )
}

export default App