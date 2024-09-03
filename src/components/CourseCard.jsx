import Link from "next/link";

export default function CourseCard({ course }) {
  return (
    <Link href={`/courses/${course._id}`}>
      <div className="max-w-sm rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl bg-white">
        <img
          className="w-full h-56 object-cover rounded-t-lg"
          src={course.thumbnail}
          alt={course.title}
        />
        <div className="p-6">
          <div className="font-bold text-xl text-gray-900 mb-2">
            {course.title}
          </div>
          <p className="text-gray-700 text-base mb-4">
            Created by Applute Team
          </p>
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col items-start">
              <p className="text-green-600 font-bold text-lg">
                ₹{course.price}
              </p>

              <p className="text-gray-500 text-sm line-through mt-1">
                ₹{"10,000"}
              </p>
            </div>
            <Link href={`/courses/${course._id}`}>
              <p className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-700">
                View Details
              </p>
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
}
