import emptyImg from "../../assets/noContent.svg";

export const NotFound = () => {
    return (
        <div
            className={"flex flex-col items-center justify-center"}
        >
            <img src={emptyImg} alt={"no data available"} width={150}/>
            <h6
                className={"mt-1 font-bold text-secondary"}
            >
                No data available
            </h6>
            <p className={"font-normal text-gray-500"}>
                add some tasks to see them here
            </p>
        </div>
    );
};
