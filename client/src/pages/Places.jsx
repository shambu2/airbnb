import { Link, useParams } from "react-router-dom";

const Places = () => {
    const { action } = useParams()
    return (
        <div>
            {action !== "new" && (
                <div className="text-center">
                    <Link className="bg-blue-500 inline-flex gap-1 text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>

                        Add new place

                    </Link>
                </div>
            )}
            {action === 'new' && (
                <div className="w-[95vw] mx-auto">
                    <form action="">
                        <h2 className="text-2xl mt-4">Title</h2>
                        <p className="text-gray-500 text-sm">Title for your place should be short and catchy as in ads</p>
                        <input type="text" placeholder="title" className="w-full" />
                        <h2 className="text-2xl mt-4">Address</h2>
                        <p className="text-gray-500 text-sm">address to your place</p>

                        <input type="text" placeholder="address"  className="w-full"/>
                        <h2 className="text-2xl mt-4">Photos</h2>
                        <p className="text-gray-500 text-sm">more = better</p>
                        <button className="border bg-transparent rounded-2xl p-4">+</button>


                    </form>
                </div>
            )}

        </div>
    )
}
export default Places;