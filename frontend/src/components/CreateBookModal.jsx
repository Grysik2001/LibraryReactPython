import {Flex, Input, Text, Textarea, useDisclosure} from "@chakra-ui/react"
import {Button} from "@chakra-ui/react";
import {
    DialogActionTrigger,
    DialogBody,
    DialogCloseTrigger,
    DialogContent, DialogFooter,
    DialogHeader,
    DialogRoot, DialogTitle,
    DialogTrigger
} from "./ui/dialog.jsx";
import {BiAddToQueue} from "react-icons/bi";
import {Field} from "./ui/field.jsx";
import {useState} from "react";
import {BASE_URL} from "../App.jsx";
import {Toaster, toaster} from "./ui/toaster.jsx";


const CreateBookModal = ({ setBooks }) => {
    const { onClose } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);
    const [inputs, setInputs] = useState({
        title: "",
        author: "",
        description: "",
        owner: "",
        img: "",
        name_borrow: "",
        surname_borrow: "",
        email_borrow: " "
    });

    const toast_succes = () => toaster.create({
        type: "success",
        title: "Książka została dodana."
    });

    const toast_error = (error) => toaster.create({
        type: "error",
        title: "Błąd przy dodawaniu książki.",
        description: error.message
    });

    const handleCreateBook = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try{
            const newBookData = {
                ...inputs,
                name_borrow: "",
                surname_borrow: "",
                email_borrow: "",
                isBorrow: false,
            };

            const res = await fetch(BASE_URL + "/books", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify(newBookData),
            })
            const data = await res.json()
            if(!res.ok) {
                throw new Error(data.error)
            }
            setBooks((prevBooks) => [...prevBooks, data]);
            onClose();
            toast_succes();
             setInputs({
                title: "",
                author: "",
                description: "",
                owner: "",
                img: ""
            })
        } catch (error) {
            toast_error(error);
        } finally {
            setIsLoading(false);
        }

    };

    return (
          <DialogRoot>
            <DialogTrigger >
              <Button variant="outline" size= "md">
                  <BiAddToQueue/>
              </Button>
            </DialogTrigger>
            <DialogContent>
                <form onSubmit={handleCreateBook}>
                  <DialogHeader>
                    <DialogTitle>Dodaj książkę</DialogTitle>
                  </DialogHeader>
                  <DialogBody pb={6}>
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
                                onChange={(e) => setInputs({...inputs, img: e.target.value})}
                                />
                        </Field>

                  </DialogBody>
                  <DialogFooter>
                      <Text textStyle="xs" color="grey">Wypełnij każde pole aby dokonać wypożyczenia.</Text>
                    <DialogActionTrigger>
                      <Button variant="outline">Anuluj</Button>
                    </DialogActionTrigger>

                      <DialogActionTrigger>
                          <Button type='submit'>Dodaj</Button>
                      </DialogActionTrigger>
                  </DialogFooter>
                  <DialogCloseTrigger />
                </form>
                <Toaster />
            </DialogContent>
          </DialogRoot>
  )
}
export default CreateBookModal