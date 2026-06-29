import "./App.css";

function App() {
  
  function greet(name) {
    alert(`Hi, how are you ${name}?`);
  }

  function GreetButton() {
  return (
    <button>Click me!</button>
  );
}

  let name = "Stephen";

  return (
    <>
      <h1>Hello {name}</h1>
      <p>This is my first React statement.</p>
      <p>I can't believe how it refreshes automatically</p>
      <button onClick={() => greet(name)}>My first button!</button>
      <p>I will be back soon! I can't wait to see you again.</p>
      <GreetButton />
      <div className="">
        <h1>Weather</h1>
      </div>
      <div id="extra" className="content">
        <div className="LA">
          <h2>Los Angeles, CA</h2>
          <p id="tempLA"></p>
        </div>
        <div className="SF">
          <h2>San Francisco, CA</h2>
          <p id="tempSF"></p>
        </div>
        <div className="NY">
          <h2>New York, NY</h2>
          <p id="tempNY"></p>
        </div>
        <div className="DC">
          <h2>Washington, D.C.</h2>
          <p id="tempDC"></p>
        </div>
		  </div>
    </>
  )
}

export default App