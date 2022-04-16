import { useState, useCallback } from "react";
import axios from "axios";

const useMongo = () => {
    const [typedName, setTypedName] = useState("");
    const [names, setNames] = useState([]);

    const getAllNames = useCallback(async () => {
        const { data } = await axios.get("/api/mongo/all");
        setNames(data.map((mongoDoc) => mongoDoc.name));
    });

    const saveName = useCallback(
        async (name) => {
            setTypedName("");

            try {
                await axios.post("/api/mongo", { name });
                getAllNames();
            } catch (error) {
                console.log("failed req with", error);
            }
        },
        [typedName, getAllNames]
    );

    return {
        getAllNames,
        saveName,
        typedName,
        setTypedName,
        names,
    };
};

export default useMongo;
