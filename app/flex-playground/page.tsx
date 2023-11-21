// If you donot give a flex child width and have grow enabled, it will simply grow to even extend the parent container itself.
export default function Page() {
  return (
    // <div className="flex w-[500px] h-[200px] bg-red-500">
    //   <div className="bg-yellow-500 w-64">
    //     <h1>Hello</h1>
    //   </div>
    //   <div className="bg-green-500 grow flex overflow-auto ">
    //     <h1>hello</h1>
    //     <h1>hello</h1>
    //     <h1>hello</h1>
    //     <h1>hello</h1>
    //     <h1>hello</h1>
    //     <h1>hello</h1>
    //     <h1>hello</h1>
    //     <h1>hello</h1>
    //     <h1>hello</h1>
    //     <h1>hello</h1>
    //     <h1>hello</h1>
    //     <h1>hello</h1>
    //     <h1>hello</h1>
    //     <h1>hello</h1>
    //     <h1>hello</h1>
    //     <h1>hello</h1>
    //     <h1>hello</h1>
    //     <h1>hello</h1>
    //     <h1>hello</h1>
    //     <h1>hello</h1>
    //     <h1>hello</h1>
    //     <h1>hello</h1>
    //     <h1>hello</h1>
    //     <h1>hello</h1>
    //     <h1>hello</h1>
    //     <h1>hello</h1>
    //     <h1>hello</h1>
    //     <h1>hello</h1>
    //     <h1>hello</h1>
    //     <h1>hello</h1>
    //     <h1>hello</h1>
    //     <h1>hello</h1>
    //     <h1>hello</h1>
    //     <h1>hello</h1>
    //     <h1>hello</h1>
    //   </div>
    // </div>

    // In the parent's primary axis, the child can never be more than parent's height/width. The height/width is the hypothetical size and not the real size.

    // Flex child's height is going to be more than flex container's height. This is the primary axis. It is not possible to go beyond container's height
    <div className="flex flex-col h-[400px] bg-red-500 gap-20 py-8">
      <div className="py-2 bg-yellow-500">NavBar</div>
      <div className="bg-green-500 grow flex overflow-hidden pr-8">
        <div className="bg-purple-500 w-96 overflow-auto">
          <h1 className="mt-20">Child</h1>
          <h1 className="mt-20">Child</h1>
          <h1 className="mt-20">Child</h1>
          <h1 className="mt-20">Child</h1>
          <h1 className="mt-20">Child</h1>
        </div>
        <div className="bg-sky-500 w-96 grow overflow-auto">
          <h1 className="mt-6">Child</h1>
          <h1 className="mt-6">Child</h1>
          <h1 className="mt-6">Child</h1>
          <h1 className="mt-6">Child</h1>
          <h1 className="mt-6">Child</h1>
          <h1 className="mt-6">Child</h1>
          <h1 className="mt-6">Child</h1>
          <h1 className="mt-6">Child</h1>
          <h1 className="mt-6">Child</h1>
          <h1 className="mt-6">Child</h1>
          <h1 className="mt-6">Child</h1>
          <h1 className="mt-6">Child</h1>
          <h1 className="mt-6">Child</h1>
          <h1 className="mt-6">Child</h1>
          {/* <h1 className="mt-6">Child</h1>
          <h1 className="mt-6">Child</h1>
          <h1 className="mt-6">Child</h1>
          <h1 className="mt-6">Child</h1>
          <h1 className="mt-6">Child</h1>
          <h1 className="mt-6">Child</h1>
          <h1 className="mt-6">Child</h1>
          <h1 className="mt-6">Child</h1>
          <h1 className="mt-6">Child</h1>
          <h1 className="mt-6">Child</h1>
          <h1 className="mt-6">Child</h1>
          <h1 className="mt-6">Child</h1>
          <h1 className="mt-6">Child</h1>
          <h1 className="mt-6">Child</h1>
          <h1 className="mt-6">Child</h1>
          <h1 className="mt-6">Child</h1>
          <h1 className="mt-6">Child</h1>
          <h1 className="mt-6">Child</h1>
          <h1 className="mt-6">Child</h1>
          <h1 className="mt-6">Child</h1>
          <h1 className="mt-6">Child</h1>
          <h1 className="mt-6">Child</h1>
          <h1 className="mt-6">Child</h1>
          <h1 className="mt-6">Child</h1>
          <h1 className="mt-6">Child</h1>
          <h1 className="mt-6">Child</h1>
          <h1 className="mt-6">Child</h1>
          <h1 className="mt-6">Child</h1>
          <h1 className="mt-6">Child</h1>
          <h1 className="mt-6">Child</h1>
          <h1 className="mt-6">Child</h1>
          <h1 className="mt-6">Child</h1> */}
        </div>
      </div>
    </div>
  );
}
