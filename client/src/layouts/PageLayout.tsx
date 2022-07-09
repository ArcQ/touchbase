type Props = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export default function PageLayout(props: Props) {
  return (
    <div className="flex justify-center min-h-[70vh]">
      <div className="mx-5 mt-10 md:mx-10 max-w-screen-xl">
        <div className="mb-10">
          <h1 className="text-2xl font-bold md:text-5xl">{props.title}</h1>
          {props.description && <p>{props.description}</p>}
        </div>
        <div>{props.children}</div>
      </div>
    </div>
  );
}
