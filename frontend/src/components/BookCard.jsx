import React from 'react';
import {
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    Flex,
    Heading,
    Image,
    Text,
} from '@chakra-ui/react';
import BorrowBook from "./BorrowBook.jsx";
import {BiTrash} from "react-icons/bi";
import {BASE_URL} from "../App.jsx";
import {Toaster, toaster} from "./ui/toaster.jsx";
import EditBook from "./EditBook.jsx";


const BookCard = ({ book, setBooks }) => {

    const toast_succes = () => toaster.create({
        type: "success",
        title: "Usunąłeś książkę."
    });

    const toast_error = (error) => toaster.create({
        type: "error",
        title: "Błąd z usunięciem książki",
        description: error.message
    });

    const handleDeleteBook = async () => {
        try {
            const res = await fetch(BASE_URL + "/books/" + book.id, {
                method: "DELETE"
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error);
            }
            setBooks((prevBooks) => prevBooks.filter((b) => b.id !== book.id));
            toast_succes()
        } catch (error)
        {
            toast_error(error)
        }
    }

    return (
        <Card.Root>
            <CardHeader>
                <Flex gap="2">
                    <Image
                            src={book.img}
                            alt={book.title}
                            style={{ width: '80px', height: 'auto', borderRadius: '8px' }}
                    />
                    <Box >

                        <Flex alignItems="center" pl={1} >
                            <Box mr={20}>
                                <Heading size="sm">{book.author}</Heading>
                                <Text textStyle="lg" fontWeight="low">{book.title}</Text>
                                <Text textStyle="xs">Właściciel: {book.owner}</Text>
                            </Box>
                        </Flex>

                        <Flex mt={2}>
                            <BorrowBook book={book} setBooks={setBooks} />

                            <EditBook book={book} setBooks={setBooks}/>

                            <Button size={"md"}
                                    bg={"gray.600"}
                                    color={"red"}
                                    _hover={{ bg: "gray.700" }}
                                    onClick={handleDeleteBook}
                            >
                                <BiTrash size={20}/>
                                <Toaster />
                            </Button>


                        </Flex>
                    </Box>
                </Flex>
            </CardHeader>
            <CardBody>
                {book.description}
            </CardBody>

        </Card.Root>
    );
};
export default BookCard;
