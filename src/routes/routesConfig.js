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
        path: '/',
        exact: true,
        element: Articles
    },
    {
        path: '/:id',
        exact: true,
        element: CurrentPost
    },
    {
        path: '/work',
        exact: true,
        element: Vacancies
    },
    {
        path: 'my_vacancies',
        exact: true,
        element: MyVacancies
    },
    {
        path: '/courses',
        exact: true,
        element: Courses
    },
    {
        path: '/repcourses',
        exact: true,
        element: RepCourses
    },
    {
        path: '/mycourses',
        exact: true,
        element: MyCourses
    },
    {
        path: '/chat',
        exact: true,
        element: Articles
    },
    {
        path: '/my_posts',
        exact: true,
        element: MyArticles
    },
    {
        path: '/work/:id',
        exact: true,
        element: Vacancy
    },
    {
        path: '/courses/:id',
        exact: true,
        element: CurrentCourse
    },
    {
        path: '/courses/:id/:idd',
        exact: true,
        element: LessonPage
    },
    {
        path: '/my_replies',
        exact: true,
        element: Replies
    },
    {
        path: 'my_vacancies/1',
        exact: true,
        element: MyVacancy
    },
    {
        path: '/createcourse',
        exact: true,
        element: CourseCreator
    },
    {
        path: '/editcourse',
        exact: true,
        element: CourseEditor
    },
    {
        path: '/mycourses/1',
        exact: true,
        element: MyCourse
    },
    {
        path: '/mycourses/1/:id',
        exact: true,
        element: MyLesson
    },
    {
        path: '/person/:id',
        exact: true,
        element: PersonPage
    },
    {
        path: '/myperson',
        exact: true,
        element: ProfilePage
    },
    {
        path: '/registration',
        exact: true,
        element: Registration
    },
    {
        path: '/edition',
        exact: true,
        element: Edition
    },
    {
        path: '/createpost',
        exact: true,
        element: CreatePost
    },
    {
        path: '/mypost',
        exact: true,
        element: MyPost
    },
    {
        path: '/chat/:id',
        exact: true,
        element: Chat
    },
]
export default routesConfig;