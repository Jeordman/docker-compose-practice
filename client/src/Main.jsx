import { useEffect } from "react";
import usePostgres from "./hooks/usePostgres";
import useMongo from "./hooks/useMongo";

/** Fancy text to alert what db data is coming from */
const FancyDbText = ({ db }) => {
    return (
        <div>
            THIS IS FROM - <strong>{db}</strong> - DOCKER CONTAINER
        </div>
    );
};

/**
 * Display list of items
 * @param {string[]} items
 * */
const DisplayList = ({ items }) => {
    return (
        <>
            {items.map((it, i) => {
                return <li key={`${it}+${i}`}>{it}</li>;
            })}
        </>
    );
};

const Main = () => {
    const { getAllNumbers, saveNumber, typedNumber, setTypedNumber, numbers } =
        usePostgres();

    const { getAllNames, saveName, typedName, setTypedName, names } =
        useMongo();

    useEffect(() => {
        getAllNumbers();
        getAllNames();
    }, []);

    return (
        <>
            <section className="db-item-holder">
                <FancyDbText db="POSTGRES" />
                <DisplayList items={numbers} />
                <input
                    type="text"
                    value={typedNumber}
                    onChange={(e) => setTypedNumber(e.target.value)}
                />
                <button onClick={() => saveNumber(typedNumber)}>Save</button>
            </section>
            <section className="db-item-holder">
                <FancyDbText db="MONGO" />
                <DisplayList items={names} />
                <input
                    type="text"
                    value={typedName}
                    onChange={(e) => setTypedName(e.target.value)}
                />
                <button onClick={() => saveName(typedName)}>Save</button>
            </section>
        </>
    );
};

export default Main;
