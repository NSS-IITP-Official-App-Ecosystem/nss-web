export default function Unit2() {

  return (

    <div className="min-h-screen bg-gray-100">

      {/* Hero Section */}
      <div className="bg-green-700 text-white py-20 text-center">

        <h1 className="text-5xl font-bold">
          NSS Unit 2
        </h1>

        <p className="mt-4 text-xl">
          Working together for positive social impact
        </p>

      </div>

      {/* About Section */}
      <div className="p-10">

        <h2 className="text-3xl font-bold mb-4">
          About Unit 2
        </h2>

        <p className="text-gray-700 text-lg leading-8">

          Unit 2 of NSS IIT Patna actively participates in
          awareness campaigns, social welfare programs,
          and community engagement initiatives.

        </p>

      </div>

      {/* Activities Section */}
      <div className="p-10 bg-white">

        <h2 className="text-3xl font-bold mb-6">
          Activities
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-green-100 p-6 rounded-xl shadow">
            Awareness Campaigns
          </div>

          <div className="bg-green-100 p-6 rounded-xl shadow">
            Plantation Drives
          </div>

          <div className="bg-green-100 p-6 rounded-xl shadow">
            Community Outreach
          </div>

        </div>

      </div>

    </div>

  );

}