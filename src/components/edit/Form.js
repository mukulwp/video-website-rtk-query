import { useState } from "react";
import TextArea from "../ui/TextArea";
import TextInput from "../ui/TextInput";
import { useEditVideoMutation } from "../../features/api/apiSlice";
import Error from "../ui/Error";
import { useNavigate } from "react-router-dom";

export default function Form({ video }) {
  const {
    id,
    title: initTitle,
    author: initAuthor,
    description: initDescription,
    link: initLink,
    thumbnail: initThumbnail,
    date: initDate,
    duration: initDuration,
    views: initViews,
  } = video;

  const [editVideo, { isLoading, isError }] = useEditVideoMutation();

  const [showError, setShowError] = useState(isError);
  const navigate = useNavigate();

  const [data, setData] = useState({
    title: initTitle,
    author: initAuthor,
    description: initDescription,
    link: initLink,
    thumbnail: initThumbnail,
    date: initDate,
    duration: initDuration,
    views: initViews,
  });
  const { title, author, description, link, thumbnail, date, duration, views } =
    data;

  const handleSubmit = async(e) => {
    e.preventDefault();

    const{data} = await editVideo({
      id,
      data: {
        title,
        author,
        description,
        link,
        thumbnail,
        date,
        duration,
        views,
      },
    });
    if(!data){
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 4000);
    }else{
      navigate(`/videos/${id}`)
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
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <TextInput
                title="Author"
                value={author}
                onChange={(e) => setData({ ...data, author: e.target.value })}
              />
            </div>

            <div className="col-span-6">
              <TextArea
                title="Description"
                value={description}
                onChange={(e) =>
                  setData({ ...data, description: e.target.value })
                }
              />
            </div>

            <div className="col-span-6">
              <TextInput
                title="YouTube Video link"
                value={link}
                onChange={(e) => setData({ ...data, link: e.target.value })}
              />
            </div>

            <div className="col-span-6">
              <TextInput
                title="Thumbnail link"
                value={thumbnail}
                onChange={(e) =>
                  setData({ ...data, thumbnail: e.target.value })
                }
              />
            </div>

            <div className="col-span-6 sm:col-span-6 lg:col-span-2">
              <TextInput
                title="Upload Date"
                value={date}
                onChange={(e) => setData({ ...data, date: e.target.value })}
              />
            </div>

            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <TextInput
                title="Video Duration"
                value={duration}
                onChange={(e) => setData({ ...data, duration: e.target.value })}
              />
            </div>

            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <TextInput
                title="Video no of views"
                value={views}
                onChange={(e) => setData({ ...data, views: e.target.value })}
              />
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
        {showError && <Error message="There was an error editing video!" />}
      </div>
    </form>
  );
}
