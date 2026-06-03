import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function BlogPage() {
  const posts = [
    {
      title: "Cum alegi serviciul potrivit pentru animalul tău?",
      text: "Alege serviciul în funcție de nevoile animalului: grooming, plimbare, training sau îngrijire."
    },
    {
      title: "De ce este importantă socializarea animalelor?",
      text: "Socializarea ajută animalele să fie mai calme, mai prietenoase și mai ușor de gestionat."
    },
    {
      title: "Sfaturi pentru prima programare",
      text: "Completează datele animalului și adaugă note speciale pentru provider."
    }
  ];

  return (
      <div className="min-h-screen bg-[#fdf7f2] flex flex-col">
        <Navbar />

        <main className="flex-grow container mx-auto px-6 py-16">
          <h1 className="text-4xl font-bold text-[#5A3B1F] mb-8 text-center">
            Blog
          </h1>

          <div className="max-w-5xl mx-auto mb-12 rounded-2xl overflow-hidden shadow-md border border-[#e2c6aa]">
            <img
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1200&auto=format&fit=crop"
                alt="Câini și pisici la joacă"
                className="w-full h-64 md:h-80 object-cover"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {posts.map((post, index) => (
                <div
                    key={index}
                    className="bg-white p-6 rounded-2xl shadow-md border border-[#e2c6aa]"
                >
                  <h2 className="text-xl font-bold text-[#5A3B1F] mb-3">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 text-sm leading-6">{post.text}</p>
                </div>
            ))}
          </div>
        </main>

        <Footer />
      </div>
  );
}