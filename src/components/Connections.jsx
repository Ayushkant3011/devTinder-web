import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

import UserCard from "./UserCard";
import ConnectionImagesModal from "./ConnectionImagesModal";

const Connections = () => {

  const dispatch = useDispatch();

  const connections = useSelector(
    (store) => store.connections
  );

  const [selectedConnection, setSelectedConnection] = useState(null);

  const [showImages, setShowImages] = useState(false);

  const fetchConnections = async () => {

    try {

      const res = await axios.get(
        BASE_URL + "/user/connections",
        {
          withCredentials: true
        }
      );

      console.log(res.data.data);

      dispatch(addConnections(res.data.data));

    } catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  if (connections.length === 0) {
    return (
      <h1 className="text-3xl font-extrabold text-center mt-10">
        No Connections Found !!
      </h1>
    );
  }

  return (

    <div className="text-center my-10">

      <h1 className="text-3xl font-extrabold">
        Connections
      </h1>

      {/* Connections list */}
      <div className="mt-6">

        {connections
            .filter((connection) => connection)
            .map((connection) => {

            const {
                _id,
                firstName,
                lastName,
                photoUrl,
                age,
                gender,
                about
            } = connection;

          return (

            <div
              key={_id}
              className="
                flex
                m-4
                p-4
                rounded-lg
                bg-base-300
                w-1/2
                mx-auto
                cursor-pointer
                transition-all
                duration-200
                hover:shadow-lg
                hover:scale-[1.01]
              "
              onClick={() => {
                setSelectedConnection(connection);
                setShowImages(false);
              }}
            >

              {/* Profile image */}
              <div>

                <img
                  alt="Photo"
                  className="w-20 h-20 rounded-full object-cover"
                  src={photoUrl}
                />

              </div>

              {/* Information */}
              <div className="text-left mx-4">

                <h2 className="font-bold text-xl">
                  {firstName + " " + lastName}
                </h2>

                {age && gender && (
                  <p>
                    {age + ", " + gender}
                  </p>
                )}

                <p>
                  {about}
                </p>

              </div>

            </div>

          );

        })}

      </div>


      {/* Profile Modal */}
      {selectedConnection && !showImages && (

        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedConnection(null)}
        >

          <div
            className="relative"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Close */}
            <button
              className="
                absolute
                -top-4
                -right-4
                z-10
                btn
                btn-circle
                btn-sm
                bg-base-100
                shadow-lg
              "
              onClick={() => setSelectedConnection(null)}
            >
              ✕
            </button>

            <UserCard
              user={selectedConnection}
              showActions={false}
              onImagesClick={() => setShowImages(true)}
            />

          </div>

        </div>

      )}


      {/* Images Modal */}
      {selectedConnection && showImages && (

        <ConnectionImagesModal
          user={selectedConnection}
          onClose={() => setShowImages(false)}
        />

      )}

    </div>
  );
};

export default Connections;