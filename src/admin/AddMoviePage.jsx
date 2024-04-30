import * as movieActions from "../actions/movies";

const AddMoviePage = () => {
  // const dispatch = useDispatch();

  // const { movies } = useSelector((state) => state.moviesReducer);
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   dispatch(movieActions.getMovies())
  //     .then(() => {
  //       setLoading(false);
  //     })
  //     .catch(() => {
  //       setLoading(false);
  //     });
  // }, [dispatch]);

  // if (loading) {
  //   return (
  //     <div className="pacmanSpinner">
  //       <PacmanLoader
  //         color={"#ebe534"}
  //         loading={loading}
  //         size={30}
  //         aria-label="Loading Spinner"
  //         data-testid="loader"
  //       />
  //     </div>
  //   );
  // }

  return (
    <div>
      <h1>Add movie</h1>
    </div>
  );
};

export default AddMoviePage;
