import { useState } from "react";
import { useAddVideoMutation } from "../../features/api/apiSlice";
import TextArea from "../ui/TextArea";
import TextInput from "../ui/TextInput";
import Success from "../ui/Success";
import Error from "../ui/Error";

export default function Form() {
  let [addVideo, { isError, isLoading, isSuccess }] = useAddVideoMutation();
  const [showSuccess, setShowSuccess] = useState(isSuccess);
  const [showError, setShowError] = useState(isError);

  const [data, setData] = useState({
    title: "",
    author: "",
    description: "",
    videoLink: "",
    thumbnailLink: "",
    date: "",
    duration: "",
    views: "",
  });
  const {
    title,
    author,
    description,
    videoLink,
    thumbnailLink,
    date,
    duration,
    views,
  } = data;

  const resetForm = () => {
    setData({
      title: "",
      author: "",
      description: "",
      videoLink: "",
      thumbnailLink: "",
      date: "",
      duration: "",
      views: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await addVideo({
      title,
      author,
      description,
      link: videoLink,
      thumbnail: thumbnailLink,
      date,
      duration,
      views,
    });

    if (data) {
      resetForm();

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 4000);
    } else {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 4000);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <TextInput
                title="Video Title"
                value={title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
                required
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <TextInput
                title="Author"
                value={author}
                onChange={(e) => setData({ ...data, author: e.target.value })}
                required
              />
            </div>

            <div className="col-span-6">
              <TextArea
                title="Description"
                value={description}
                onChange={(e) =>
                  setData({ ...data, description: e.target.value })
                }
                required
              />
            </div>

            <div className="col-span-6">
              <TextInput
                title="YouTube Video link"
                value={videoLink}
                onChange={(e) =>
                  setData({ ...data, videoLink: e.target.value })
                }
                required
              />
            </div>

            <div className="col-span-6">
              <TextInput
                title="Thumbnail link"
                value={thumbnailLink}
                onChange={(e) =>
                  setData({ ...data, thumbnailLink: e.target.value })
                }
                required
              />
            </div>

            <div className="col-span-6 sm:col-span-6 lg:col-span-2">
              <TextInput
                title="Upload Date"
                value={date}
                onChange={(e) => setData({ ...data, date: e.target.value })}
                required
              />
            </div>

            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <TextInput
                title="Video Duration"
                value={duration}
                onChange={(e) => setData({ ...data, duration: e.target.value })}
                required
              />
            </div>

            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <TextInput
                title="Video no of views"
                value={views}
                onChange={(e) => setData({ ...data, views: e.target.value })}
                required
              />
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            disabled={isLoading}
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>

        {showSuccess && <Success message="Video was added successfully!" />}
        {showError && <Error message="There was an error adding video!" />}
      </div>
    </form>
  );
}
