"use client"; // Ensure this directive is at the top of the file

import { useEffect, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CoursePage({ params }) {
  const [course, setCourse] = useState(null);
  const [playingUrl, setPlayingUrl] = useState("");
  const [player, setPlayer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("content"); // Default tab
  let courseid = params.id;
  let user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (courseid) {
      const fetchCourse = async () => {
        const response = await fetch(`/api/courses/${courseid}`);
        if (response.ok) {
          const data = await response.json();
          setCourse(data);
          if (data.content.length > 0) {
            setPlayingUrl(data.content[0].topicUrl);
          }
        } else {
          console.error("Failed to fetch course");
        }
      };

      fetchCourse();
    }
  }, [courseid]);

  useEffect(() => {
    const videoElement = document.getElementById("video-player");

    if (videoElement) {
      const playerInstance = videojs(videoElement, {
        controls: true,
        autoplay: false,
        preload: "auto",
        playbackRates: [0.5, 1, 1.5, 2],
        fluid: true,
        responsive: true,
      });

      setPlayer(playerInstance);

      return () => {
        if (playerInstance) {
          playerInstance.dispose();
        }
      };
    }
  }, [playingUrl]);

  useEffect(() => {
    if (player && playingUrl) {
      player.src({ src: playingUrl, type: "video/mp4" });
      player.play().catch((error) => {
        console.error("Error playing video:", error);
      });
    }
  }, [playingUrl, player]);

  if (!course) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4 lg:px-72">
      <ToastContainer />
      <div className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden">
        <div className="w-full relative aspect-w-16 aspect-h-9 bg-gray-200">
          <div data-vjs-player>
            <video
              id="video-player"
              className="video-js vjs-default-skin w-full h-full"
              controls
              preload="auto"
            >
              <source src={playingUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        <div className="w-full p-6 flex flex-col justify-between flex-grow">
          <div>
            <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
            <span className="text-sm font-bold text-blue-800 inline-block mb-2">
              {course.createdBy || "Applute Team"}
            </span>
            <p className="text-gray-700 mb-4">{course.description}</p>
            <div className="tabs">
              <ul className="flex border-b border-gray-200 justify-around">
                <li
                  className={`cursor-pointer py-2 px-4 text-center ${
                    activeTab === "content"
                      ? "border-b-2 border-blue-600 font-semibold"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("content")}
                >
                  Content
                </li>
                <li
                  className={`cursor-pointer py-2 px-4 text-center ${
                    activeTab === "notes"
                      ? "border-b-2 border-blue-600 font-semibold"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("notes")}
                >
                  Notes
                </li>
                <li
                  className={`cursor-pointer py-2 px-4 text-center ${
                    activeTab === "test"
                      ? "border-b-2 border-blue-600 font-semibold"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("test")}
                >
                  Test
                </li>
              </ul>
              <div className="">
                {activeTab === "content" && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">Course Content</h2>
                    <ul className="space-y-4">
                      {course.content.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-center justify-between cursor-pointer"
                          onClick={() => setPlayingUrl(item.topicUrl)}
                        >
                          <span>{item.topicTitle}</span>
                          <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300">
                            Play
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {activeTab === "notes" && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">Notes</h2>
                    <p className="text-gray-700">No notes available yet.</p>
                  </div>
                )}
                {activeTab === "test" && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">Test</h2>
                    <p className="text-gray-700">No test available yet.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Bottom Section */}
        {/* <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg border-t border-gray-200 flex items-center justify-between p-4 lg:px-72 lg:py-4">
          <div className="flex-1 flex flex-col items-start">
            <p className="text-xl font-bold text-green-600 mb-1">
              ₹{course.price}
            </p>
            <p className="text-sm text-gray-500 line-through ml-1">
              ₹{"10,000"}
            </p>
          </div>
          <button
            onClick={handleBuyNow}
            className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-full hover:bg-blue-700 transition duration-300"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Buy Now"}
          </button>
        </div> */}
      </div>
    </div>
  );
}
