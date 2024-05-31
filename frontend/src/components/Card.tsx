function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="flex flex-col w-1/2 md:w-1/6 border-l-8 rounded-md border-cyan-400 bg-white">
      <p className="p-3 pb-0 text-md text-gray-600">{title}</p>
      <p className="mb-2 px-3 text-4xl font-bold text-gray-600">{value}</p>
    </div>
  );
}

export default Card;
