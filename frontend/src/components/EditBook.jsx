import {
    Button,
    Flex,
    DrawerBackdrop,
    DrawerBody,
    DrawerCloseTrigger,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerRoot,
    DrawerTitle,
    DrawerTrigger,
    useDisclosure, Input, Textarea, Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { BASE_URL } from "../App";
import {Toaster, toaster} from "./ui/toaster.jsx";
import {Field} from "./ui/field.jsx";
import {FaEdit} from "react-icons/fa";
import {DrawerActionTrigger} from "./ui/drawer.jsx";

const EditBook = ({ book, setBooks }) => {
	const { onClose, isOpen } = useDisclosure();
	const [isLoading, setIsLoading] = useState(false);
	const [inputs, setInputs] = useState({
		title: book.title,
		author: book.author,
		description: book.description,
		owner: book.owner,
		img: book.img,
	});

	const toast_succes = () => toaster.create({
        type: "success",
        title: "Książka została zedytowana."
    });

    const toast_error = (error) => toaster.create({
        type: "error",
        title: "Błąd przy edycji książki.",
        description: error.message
    });

	const handleEditBook = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const res = await fetch(BASE_URL + "/books/" + book.id, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(inputs),
			});
			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.error);
			}
			setBooks((prevBooks) => prevBooks.map((b) => (b.id === book.id ? data : b)));
			toast_succes()
			onClose();
            setInputs({
                title: "",
                author: "",
                description: "",
                owner: "",
                img: ""
            })
		} catch (error) {
			toast_error(error)
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<DrawerRoot isOpen={isOpen} onClose={onClose}>
          <DrawerBackdrop />
          <DrawerTrigger>
              <Button size={"md"}
                      mr={2}
                      bg={"gray.600"}
                      color={"blue"}
                      _hover={{ bg: "gray.700" }}>
				<FaEdit size={20}/>
              </Button>
          </DrawerTrigger>
            <DrawerContent>
                <form onSubmit={handleEditBook}>
                    <DrawerCloseTrigger/>
                    <DrawerHeader>
                        <DrawerTitle>Edycja Książki</DrawerTitle>
                    </DrawerHeader>
                    <DrawerBody>
                        <Flex alignItems={"center"} gap={4}>
                        {/*Left*/}
                        <Field
                            label={"Tytuł"}
                            mb={4}
                        >
                        <Input
                            placeholder={"Lalka"}
                            variant={"outline"}
                            value={inputs.title}
                            onChange={(e) => setInputs({...inputs, title: e.target.value})}
                            />
                        </Field>

                        {/*Right*/}
                        <Field
                            label={"Autor"}
                            mb={4}
                        >
                            <Input
                                placeholder={"Bolesław Prus"}
                                variant={"outline"}
                                value={inputs.author}
                                onChange={(e) => setInputs({...inputs, author: e.target.value})}/>
                        </Field>
                    </Flex>
                        {/*Big center*/}
                        <Field
                            label={"Opis"}
                            required helperText="Max 500 słów"
                            mb={4}
                        >
                            <Textarea
                                autoresize
                                placeholder={"Opis, wasza recenzja..."}
                                variant={"outline"}
                                value={inputs.description}
                                onChange={(e) => setInputs({...inputs, description: e.target.value})}
                            />
                        </Field>

                        <Field
                            label={"Właściciel"}
                            mb={4}
                        >
                            <Input
                                placeholder={"Imie, nazwisko"}
                                variant={"outline"}
                                value={inputs.owner}
                                onChange={(e) => setInputs({...inputs, owner: e.target.value})}/>
                        </Field>

                         <Field
                            label={"Link"}
                            mb={2}
                        >
                            <Input
                                placeholder={"www.zdjecia_ksiazke.pl/ksiazka.jpg"}
                                variant={"outline"}
                                value={inputs.img}
                                onChange={(e) => setInputs({...inputs, img: e.target.value})}/>
                        </Field>
                    </DrawerBody>
                    <DrawerFooter>
                        <Text textStyle="xs" color="grey">Wypełnij każde pole aby dokonać aktualizacji książki.</Text>
                        <DrawerActionTrigger>
                            <Button variant="outline">Anuluj</Button>
                        </DrawerActionTrigger>

                        <DrawerActionTrigger>
                            <Button type='submit'>Zatwierdź</Button>
                        </DrawerActionTrigger>
                    </DrawerFooter>
                    <Toaster />
                </form>
            </DrawerContent>
        </DrawerRoot>
    );
}
export default EditBook;
