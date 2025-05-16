import Button from "./Button.tsx";

type PageButtonsProps = {
    page: number;
    pages: number;
    nextPage: () => void;
    prevPage: () => void;
}

const PageButtons = ({page, pages, nextPage, prevPage}: PageButtonsProps) => {
    return (
        <div className="flex justify-center p-4 mt-4 gap-2">
            {page !== 1 ? (
                <Button
                    onClick={prevPage}
                    text={"<"}
                />
            ) : (
                <Button
                    onClick={prevPage}
                    text={"<"}
                    disabled={true}
                />
            )}
            <p
                className={"text-2xl text-white w-16 text-center"}
            >
                {page}
            </p>
            {(page < pages) ? (
                <Button
                    onClick={nextPage}
                    text={">"}
                    disabled={false}
                />
            ) : (
                <Button
                    onClick={nextPage}
                    text={">"}
                    disabled={true}
                />
            )
            }
        </div>
    )
}

export default PageButtons;