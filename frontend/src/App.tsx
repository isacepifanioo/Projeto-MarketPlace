import Header from "./components/layouts/Header"

function App() {

  return (
    <>
      <Header/>
      <h1>Ola</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste minima sed rem officia asperiores non commodi iusto officiis aperiam incidunt! Temporibus, est ad? Totam distinctio debitis corrupti architecto voluptatem reprehenderit.</p>
      <input type="date" name="" id="" onChange={(e) => console.log(e.target.value)}/>
    </>
  )
}

export default App
