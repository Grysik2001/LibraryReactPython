import { Button, Input, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTrigger,
} from "./ui/drawer.jsx";
import { FaBook } from "react-icons/fa";
import { CgUnavailable } from "react-icons/cg";
import { Field } from "./ui/field.jsx";
import { toaster } from "./ui/toaster.jsx";
import { BASE_URL } from "../App.jsx";

const BorrowBook = ({ book, setBooks }) => {
  const { onClose, isOpen, onOpen } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    name_borrow: "",
    surname_borrow: "",
    email_borrow: "",
    email: "",
  });

  const isBookAvailable = () => !book.isBorrow;

  const resetAfterReturn = () => {
  setBooks((prevBooks) =>
    prevBooks.map((b) =>
      b.id === book.id
        ? {
            ...b,
            email_borrow: "",
            name_borrow: "",
            surname_borrow: "",
          }
        : b
        )
      );
    };

  const updateBookState = (updatedBook) => {
    setBooks((prevBooks) =>
      prevBooks.map((b) => (b.id === updatedBook.id ? updatedBook : b))
    );
  };

  const handleBorrow = async () => {
    setIsLoading(true);
    try {
      const updatedBook = { ...book, isBorrow: true, ...inputs };
      const res = await fetch(`${BASE_URL}/books/${book.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBook),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }

      updateBookState(updatedBook);
      toaster.create({ type: "success", title: "Książka została wypożyczona." });
      onClose();
      resetForm();
    } catch (error) {
      toaster.create({
        type: "error",
        title: "Błąd przy wypożyczeniu książki.",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReturn = async () => {
  setIsLoading(true);
  try {
    const updatedBook = {
      ...book,
      isBorrow: false,
      email_borrow: "",
      name_borrow: "",
      surname_borrow: "",
    };
    const res = await fetch(`${BASE_URL}/books/${book.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBook),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }

    updateBookState(updatedBook);
    toaster.create({ type: "success", title: "Książka została zwrócona." });
    onClose();
    resetForm();
  } catch (error) {
    toaster.create({
      type: "error",
      title: "Błąd przy zwracaniu książki.",
      description: error.message,
    });
  } finally {
    setIsLoading(false);
  }
};
  const resetForm = () => {
    setInputs({
      name_borrow: "",
      surname_borrow: "",
      email_borrow: "",
      email: "",
    });
  };

  return (
    <DrawerRoot isOpen={isOpen} onClose={onClose}>
      <DrawerBackdrop />
      <DrawerTrigger>
        <Button
          bg={isBookAvailable() ? "gray.600" : "gray.400"}
          color={isBookAvailable() ? "green" : "red"}
          _hover={{ bg: isBookAvailable() ? "gray.700" : "gray.500" }}
          mr={2}
          onClick={() => {
            resetForm();
            onOpen();
          }}
        >
          {isBookAvailable() ? <FaBook /> : <CgUnavailable />}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            isBookAvailable() ? handleBorrow() : handleReturn();
          }}
        >
          <DrawerHeader />
          <DrawerBody>
            {isBookAvailable() ? (
              <Stack mt="5">
                <Field label="Imię" required>
                  <Input
                    placeholder="Piotr"
                    value={inputs.name_borrow}
                    onChange={(e) =>
                      setInputs({ ...inputs, name_borrow: e.target.value })
                    }
                  />
                </Field>
                <Field label="Nazwisko" required>
                  <Input
                    placeholder="Frasik"
                    value={inputs.surname_borrow}
                    onChange={(e) =>
                      setInputs({ ...inputs, surname_borrow: e.target.value })
                    }
                  />
                </Field>
                <Field label="E-mail" required>
                  <Input
                    placeholder="Email@example.pl"
                    value={inputs.email_borrow}
                    onChange={(e) =>
                      setInputs({ ...inputs, email_borrow: e.target.value })
                    }
                  />
                </Field>
              </Stack>
            ) : (
              <Stack mt="5">
                <Field label="E-mail" required>
                  <Input
                    placeholder="Email@example.pl"
                    value={inputs.email}
                    onChange={(e) =>
                      setInputs({ ...inputs, email: e.target.value })
                    }
                  />
                      {inputs.email.length > 0 && inputs.email !== book.email_borrow && (
                                    <Text color="red.500" fontSize="sm">
                                        Wpisany e-mail nie pasuje do przypisanego adresu w bazie.
                                    </Text>
                                )}
                            </Field>
                  <Text textStyle="xs" color="grey">Wypełnij każde pole aby dokonać oddania książki.</Text>
              </Stack>


            )}
          </DrawerBody>
          <DrawerFooter>
              <Button
                type="submit"
                isLoading={isLoading}
                disabled={!isBookAvailable() && inputs.email !== book.email_borrow}
              >
                {isBookAvailable()
                  ? "Wypożycz"
                  : inputs.email === book.email_borrow
                  ? "Oddaj"
                  : "Wprowadź poprawny email"}
              </Button>
        </DrawerFooter>
          <DrawerCloseTrigger />
        </form>
      </DrawerContent>
    </DrawerRoot>
  );
};

export default BorrowBook;
