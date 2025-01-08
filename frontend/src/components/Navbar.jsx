import {Box, Button, Container, Flex, Text} from "@chakra-ui/react";
import {useColorMode, useColorModeValue} from "./ui/color-mode.jsx";
import {IoMoon} from "react-icons/io5";
import {LuSun} from "react-icons/lu";
import CreateBookModal from "./CreateBookModal.jsx";
import {FaBook} from "react-icons/fa";

const Navbar = ({setBooks}) => {
    const {colorMode, toggleColorMode } = useColorMode();
    return (
        <Container maxW={"900px"}>
            <Box
                px={4}
                my={4}
                borderRadius={5}
                bg={useColorModeValue("gray.200","gray.700")}

            >
                <Flex h='16'
                    alignItems={"center"}
                      justifyContent={"space-between"}
                >
                    {/*left side*/}
                    <Flex
                        alignItems={"center"}
                        justifyContent={"center"}
                        gap={3}
                        display={{base: "none", sm: "flex"}}
                    >

                        <Text fontSize={"40px"}>PrzyjaznaBiblioteka</Text>
                        <FaBook size={40}/>


                    </Flex>
                    {/*right side*/}
                    <Flex gap={4} alignItems={"center"}>
                        <Text fontSize={"lg"} fontWeight={500} display={{base: "none", md:"block"}}>
                            Dodaj swoją książkę!
                        </Text>
                        <CreateBookModal setBooks={setBooks}/>
                        <Button onClick={toggleColorMode} variant={"outline"}>
                            {colorMode === "light" ? <IoMoon /> : <LuSun size={20}/>}
                        </Button>

                    </Flex>
                </Flex>
            </Box>
        </Container>
    );
};
export default Navbar;
