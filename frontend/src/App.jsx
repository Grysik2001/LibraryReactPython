import {Container, Stack, Text} from "@chakra-ui/react";
import Navbar from "./components/Navbar.jsx"
import Bookshelf from "./components/Bookshelf.jsx"
import {BOOKS} from "./components/dummy/dummy.jsx";
import {useState} from "react";

export const BASE_URL = import.meta.env.MODE === "development" ? "http://127.0.0.1:5000/api" : "/api";

function App() {
    const [books, setBooks] = useState([])
  return (
      <Stack minH={"100vh"}>
          <Navbar setBooks={setBooks}/>

          <Container maxW= {"1200px"} my={4}>
              <Text
                fontWeight={"bold"}
                fontSize={{ base: "3x1", md: "50px" }}
                letterSpacing={"2px"}
                textTransform={"uppercase"}
                textAlign={"center"}
                mb={8}
              >
                <Text as={"span"} bgGradient={"linear(to-r, cyan.400, blue.500)"}
                >Wybierz książkę 📚</Text>
              </Text>

              <Bookshelf books={books} setBooks={setBooks}/>
          </Container>
      </Stack>
  );
}

export default App;
