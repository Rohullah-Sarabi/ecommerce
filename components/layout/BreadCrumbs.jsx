import Link from "next/link";
import { BsChevronRight } from "react-icons/bs"

const BreadCrumbs = ({ breadCrumbs }) => {
    return (
        <section className="py-5 sm:py-7 bg-blue-100">
            <div className="container max-w-screen-xl max-auto px-4">
                <ol className="inline-flex flex-wrap space-x-1 md:space-x-3 items-center">
                    {
                        breadCrumbs?.map((breadCrumb, index) => (

                            <li key={index} className="flex flex-row justify-center items-center">
                                <Link href={breadCrumb.url} className="text-gray-600 hover:text-blue-600">
                                    {breadCrumb.name}
                                </Link>
                                {
                                    breadCrumbs?.length - 1 !== index && (
                                        // <li className="ml-3 text-gray-400 fa fa-chevron-right"></li>

                                        <BsChevronRight className="ml-3 text-gray-400" />
                                    )
                                }
                            </li>
                        ))

                    }

                </ol>
            </div>
        </section>
    )
}

export default BreadCrumbs;