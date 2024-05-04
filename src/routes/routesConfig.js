import Articles from "../pages/Articles/Articles";
import MyArticles from "../pages/MyArticles/MyArticles";
import Vacancies from "../pages/Vacancies/Vacancies";
import MyVacancies from "../pages/MyVacancies/MyVacancies";
import Vacancy from "../pages/Vacancy/Vacancy";
import Replies from "../pages/Replies/Replies";
import MyVacancy from "../pages/MyVacancy/MyVacancy";
import Courses from "../pages/Courses/Courses";
import RepCourses from "../pages/RepCourses/RepCourses";
import MyCourses from "../pages/MyCourses/MyCourses";
import CurrentCourse from "../pages/CurrentCourse/CurrentCourse";
import CourseCreator from "../pages/CourseCreator/CourseCreator";
import CourseEditor from "../pages/CourseEditor/CourseEditor";
import LessonPage from "../pages/LessonPage/LessonPage";
import MyCourse from "../pages/MyCourse/MyCourse";
import MyLesson from "../pages/MyLesson/MyLesson";
import PersonPage from "../pages/PersonPage/PersonPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import Registration from "../pages/Registration/Registration";
import Edition from "../pages/Edition/Edition";
import CreatePost from "../pages/CreatePost/CreatePost";
import MyPost from "../pages/MyPost/MyPost";
import CurrentPost from "../pages/CurrentPost/CurrentPost";
import Chat from "../pages/Chat/Chat";

const routesConfig = [
    {
        path: '/poloca',
        exact: true,
        element: Articles
    },
    {
        path: '/poloca/:id',
        exact: true,
        element: CurrentPost
    },
    {
        path: '/poloca/work',
        exact: true,
        element: Vacancies
    },
    {
        path: '/poloca/my_vacancies',
        exact: true,
        element: MyVacancies
    },
    {
        path: '/poloca/courses',
        exact: true,
        element: Courses
    },
    {
        path: '/poloca/repcourses',
        exact: true,
        element: RepCourses
    },
    {
        path: '/poloca/mycourses',
        exact: true,
        element: MyCourses
    },
    {
        path: '/poloca/chat',
        exact: true,
        element: Articles
    },
    {
        path: '/poloca/my_posts',
        exact: true,
        element: MyArticles
    },
    {
        path: '/poloca/work/:id',
        exact: true,
        element: Vacancy
    },
    {
        path: '/poloca/courses/:id',
        exact: true,
        element: CurrentCourse
    },
    {
        path: '/poloca/courses/:id/:idd',
        exact: true,
        element: LessonPage
    },
    {
        path: '/poloca/my_replies',
        exact: true,
        element: Replies
    },
    {
        path: '/poloca/my_vacancies/1',
        exact: true,
        element: MyVacancy
    },
    {
        path: '/poloca/createcourse',
        exact: true,
        element: CourseCreator
    },
    {
        path: '/poloca/editcourse',
        exact: true,
        element: CourseEditor
    },
    {
        path: '/poloca/mycourses/1',
        exact: true,
        element: MyCourse
    },
    {
        path: '/poloca/mycourses/1/:id',
        exact: true,
        element: MyLesson
    },
    {
        path: '/poloca/person/:id',
        exact: true,
        element: PersonPage
    },
    {
        path: '/poloca/myperson',
        exact: true,
        element: ProfilePage
    },
    {
        path: '/poloca/registration',
        exact: true,
        element: Registration
    },
    {
        path: '/poloca/edition',
        exact: true,
        element: Edition
    },
    {
        path: '/poloca/createpost',
        exact: true,
        element: CreatePost
    },
    {
        path: '/poloca/mypost',
        exact: true,
        element: MyPost
    },
    {
        path: '/poloca/chat/:id',
        exact: true,
        element: Chat
    },
]
export default routesConfig;