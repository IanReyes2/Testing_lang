// src/app/menu/page.tsx
"use client";
import img from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useHistoryContext } from "../HistoryContext";

export default function Page() {
  const router = useRouter();
  const { history } = useHistoryContext();

  return (
    <section className="py-24 bg-white">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
        <div className="main-data p-8 sm:p-14 bg-gray-50 rounded-3xl">
          <h2 className="text-center font-manrope font-semibold text-4xl text-black mb-16">
            Order History
          </h2>
          {history.length === 0 ? (
            <p className="text-center text-gray-500">No past orders yet.</p>
          ) : (
            history.map((order) => (
              <div
                key={order.id}
                className="box p-8 rounded-3xl bg-gray-100 grid grid-cols-8 mb-7 transition-all duration-500 hover:bg-indigo-50 max-lg:max-w-xl max-lg:mx-auto"
              >
                {/* to display image ng product */}
                <div className="col-span-8 sm:col-span-4 lg:col-span-1 sm:row-span-4 lg:row-span-1">
                  <img
                    src={order.items[0]?.image || "/assets/img/Cutie.png"}
                    alt={order.items[0]?.name || "product image"}
                    className="max-lg:w-auto max-sm:mx-auto rounded-xl object-cover"
                  />
                </div>

                {/* To display yung product name */}
                <div className="col-span-8 sm:col-span-4 lg:col-span-3 flex h-full justify-center pl-4 flex-col max-lg:items-center">
                  <h5 className="font-manrope font-semibold text-2xl leading-9 text-black mb-1 whitespace-nowrap">
                    {order.items[0]?.name}
                  </h5>
                  <p className="font-normal text-base leading-7 text-gray-600 max-md:text-center">
                    {order.items[0]?.description || ""}
                  </p>
                  <p className="font-semibold text-sm leading-5 text-gray-500 mt-2">
                    Code: {order.code}
                  </p>

                  {/* Dropdown for more details */}
                  <details className="dropdown mt-3">
                    <summary className="btn btn-sm m-1">More Details</summary>
                    <ul className="menu dropdown-content bg-base-100 rounded-box z-10 w-52 p-2 shadow-sm">
                      {order.items.map((item, index) => (
                        <li key={index}>
                          <a>
                            {item.name} — ₱{item.price} x {item.quantity}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </details>
                </div>

                {/* to display yung price */}
                <div className="col-span-8 sm:col-span-4 lg:col-span-1 flex items-center justify-center">
                  <p className="font-semibold text-xl leading-8 text-black">
                    ₱{order.items[0] ? order.items[0].price : 0}
                  </p>
                </div>

                {/* to display yung quantity */}
                <div className="col-span-8 sm:col-span-4 lg:col-span-1 flex items-center justify-center">
                  <p className="font-semibold text-xl leading-8 text-indigo-600 text-center">
                    {order.items[0]?.quantity}
                  </p>
                </div>

                {/* to display yung order date */}
                <div className="col-span-8 sm:col-span-4 lg:col-span-2 flex items-center justify-center">
                  <p className="font-semibold text-xl leading-8 text-black">
                    {order.date}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Back Button */}
      <div>
        <section className="py-24 bg-white">
          <div className="fixed bottom-0 left-0 w-full flex justify-center pb-6">
            <button
              onClick={() => router.back()}
              className="fw-bold px-4 py-2 border-0 rounded"
              style={{
                backgroundColor: "#670E10",
                color: "#fff",
              }}
            >
              Back
            </button>
          </div>
        </section>
      </div>
    </section>
  );
}
