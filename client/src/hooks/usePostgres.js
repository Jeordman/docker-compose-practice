import { useState, useCallback } from "react";
import axios from "axios";

const usePostgres = () => {
    const [typedNumber, setTypedNumber] = useState("");
    const [numbers, setNumbers] = useState([]);

    const getAllNumbers = useCallback(async () => {
        const { data } = await axios.get("/api/pg/all");
        setNumbers(data.map((row) => row.number));
    });

    const saveNumber = useCallback(
        async (number) => {
            setTypedNumber("");

            if (isNaN(number)) return alert("Not a number");

            try {
                await axios.post("/api/pg", { number });
                getAllNumbers();
            } catch (error) {
                console.log("failed req with", error);
            }
        },
        [typedNumber, getAllNumbers]
    );

    return {
        getAllNumbers,
        saveNumber,
        typedNumber,
        setTypedNumber,
        numbers,
    };
};

export default usePostgres;
