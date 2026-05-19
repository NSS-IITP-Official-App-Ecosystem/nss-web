export default function Unit3() {

  return (

    <div className="min-h-screen bg-gray-100">

      {/* Hero Section */}
      <div className="bg-purple-700 text-white py-20 text-center">

        <h1 className="text-5xl font-bold">
          NSS Unit 3
        </h1>

        <p className="mt-4 text-xl">
          Inspiring change through service and leadership
        </p>

      </div>

      {/* About Section */}
      <div className="p-10">

        <h2 className="text-3xl font-bold mb-4">
          About Unit 3
        </h2>

        <p className="text-gray-700 text-lg leading-8">

          Unit 3 of NSS IIT Patna focuses on leadership,
          volunteer development, and impactful community service activities.

        </p>

      </div>

      {/* Activities Section */}
      <div className="p-10 bg-white">

        <h2 className="text-3xl font-bold mb-6">
          Activities
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-purple-100 p-6 rounded-xl shadow">
            Leadership Workshops
          </div>

          <div className="bg-purple-100 p-6 rounded-xl shadow">
            Blood Donation Camps
          </div>

          <div className="bg-purple-100 p-6 rounded-xl shadow">
            Volunteer Programs
          </div>

        </div>

      </div>

    </div>

  );

}