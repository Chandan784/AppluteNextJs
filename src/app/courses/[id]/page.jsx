"use client"; // Ensure this directive is at the top of the file

import { useEffect, useState, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaFilePdf, FaPlayCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function CoursePage({ params }) {
  const [course, setCourse] = useState(null);
  const [playingUrl, setPlayingUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [activeTab, setActiveTab] = useState("content"); // Default tab
  const courseid = params.id;
  const user = JSON.parse(localStorage.getItem("user"));
  const router = useRouter();
  const videoRef = useRef(null); // Ref for video element
  const playerRef = useRef(null); // Ref for video.js player instance

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      // Check subscription status
      const checkSubscription = async () => {
        try {
          const response = await fetch(`/api/users/${user._id}`);
          const data = await response.json();
          setIsSubscribed(data.isSubscribed); // Set subscription status
        } catch (error) {
          console.error("Error checking subscription status:", error);
        }
      };
      checkSubscription();
    }
  }, []);

  useEffect(() => {
    if (courseid) {
      const fetchCourse = async () => {
        setIsLoading(true);
        try {
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
        } catch (error) {
          console.error("Error fetching course:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchCourse();
    }
  }, [courseid]);

  useEffect(() => {
    // Initialize video.js player
    const videoElement = videoRef.current;
    if (videoElement && !playerRef.current) {
      playerRef.current = videojs(videoElement, {
        controls: true,
        autoplay: false,
        preload: "auto",
        playbackRates: [0.5, 1, 1.5, 2],
        fluid: true,
        responsive: true,
      });

      return () => {
        if (playerRef.current) {
          playerRef.current.dispose();
        }
      };
    }
  }, []);

  useEffect(() => {
    //Update player when playingUrl changes
    console.log("playingRef", playerRef.current);

    if (playerRef.current && playingUrl) {
      const player = playerRef.current;
      player.src({ src: playingUrl, type: "video/mp4" });
      player.load(); // Load the new video source
      player.play().catch((error) => {
        console.error("Error playing video:", error);
      });
    }
  }, [playingUrl]);

  const handlePlay = (url) => {
    const videoElement = videoRef.current;
    if (videoElement && !playerRef.current) {
      playerRef.current = videojs(videoElement, {
        controls: true,
        autoplay: false,
        preload: "auto",
        playbackRates: [0.5, 1, 1.5, 2],
        fluid: true,
        responsive: true,
      });

      return () => {
        if (playerRef.current) {
          playerRef.current.dispose();
        }
      };
    }
    if (!user) {
      toast.error("Please log in to access the video.");
      router.push("/auth/login");
    } else {
      if (!course.isPaid || isSubscribed) {
        // Play the video if the course is free or the user is subscribed
        setPlayingUrl(url);
      } else {
        // Redirect to the subscription page if the course is paid and the user is not subscribed
        router.push(`/subscription`);
      }
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (!course) return <p>Course not found</p>;

  return (
    <div className="container mx-auto p-4 lg:px-72">
      <ToastContainer />
      <div className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden">
        <div className="w-full relative bg-gray-200">
          <div data-vjs-player>
            <video
              ref={videoRef}
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
              <div>
                {activeTab === "content" && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">Course Content</h2>
                    <ul className="space-y-4">
                      {course.content.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-center justify-between cursor-pointer"
                          onClick={() => handlePlay(item.topicUrl)}
                        >
                          <span>{item.topicTitle}</span>
                          <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
                            onClick={() => handlePlay(item.topicUrl)}
                          >
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
                    <ul className="space-y-4">
                      {course.notes?.map((note, index) => (
                        <li
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center">
                            <FaFilePdf className="text-red-600 mr-2" />
                            <span>{note.notesTitle}</span>
                          </div>
                          <a
                            href={note.notesLink}
                            className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300"
                            download
                          >
                            Download
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {activeTab === "test" && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">Test</h2>
                    <ul className="space-y-4">
                      {course.test?.map((testItem, index) => (
                        <li
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center">
                            <FaPlayCircle className="text-blue-600 mr-2" />
                            <span>{testItem.testTitle}</span>
                          </div>
                          <button
                            onClick={() => router.push(`/quizpage`)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
                          >
                            Start Test
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Bottom Section */}
        {/* <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg border-t border-gray-200 flex items-center justify-between p-4 lg:px-72 lg:py-4">
          <span className="text-gray-600">
            Duration: {course.duration} hours
          </span>
          <span className="text-gray-600">Price: ${course.price}</span>
        </div> */}
      </div>
    </div>
  );
}
