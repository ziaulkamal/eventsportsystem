import Link from "next/link";

const SampleComponent = (id, nik) => {
    return(
            <>
                <button className="inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg h-[60px]">
                    {nik}
                </button>
            </>
       
    )
}

export default SampleComponent;