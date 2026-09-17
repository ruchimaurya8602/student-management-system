/**
 * Student Management System - Seed Data & Local Storage Initializer
 * Apex Institute of Technology & Science (AITS)
 */

const SEED_DATA = {
    currentRole: 'student', // 'landing', 'student', 'faculty', 'admin'
    currentUser: {
        id: 'STU-2024-042',
        name: 'Alex Morgan',
        rollNo: 'CS2024-042',
        role: 'student',
        department: 'Computer Science & Engineering',
        semester: '5th Semester',
        batch: '2022-2026',
        email: 'alex.morgan@apex.edu',
        phone: '+1 (555) 234-5678',
        gpa: 3.82,
        attendance: 91,
        feeStatus: 'Paid',
        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
        advisor: 'Dr. Robert Vance',
        address: '742 Evergreen Terrace, Springfield, OR'
    },
    students: [
        {
            id: 'STU-2024-042',
            name: 'Alex Morgan',
            rollNo: 'CS2024-042',
            department: 'Computer Science & Engineering',
            semester: '5th Semester',
            email: 'alex.morgan@apex.edu',
            phone: '+1 (555) 234-5678',
            gpa: 3.82,
            attendance: 91,
            feeStatus: 'Paid',
            status: 'Active',
            photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
            dob: '2003-05-14',
            gender: 'Female',
            guardian: 'Marcus Morgan (+1 555-987-1122)'
        },
        {
            id: 'STU-2024-015',
            name: 'David Chen',
            rollNo: 'CS2024-015',
            department: 'Computer Science & Engineering',
            semester: '5th Semester',
            email: 'd.chen@apex.edu',
            phone: '+1 (555) 345-6789',
            gpa: 3.95,
            attendance: 96,
            feeStatus: 'Paid',
            status: 'Active',
            photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80',
            dob: '2003-08-22',
            gender: 'Male',
            guardian: 'Kevin Chen (+1 555-888-2233)'
        },
        {
            id: 'STU-2024-089',
            name: 'Sophia Martinez',
            rollNo: 'EC2024-089',
            department: 'Electronics & Communication',
            semester: '3rd Semester',
            email: 's.martinez@apex.edu',
            phone: '+1 (555) 456-7890',
            gpa: 3.45,
            attendance: 72,
            feeStatus: 'Pending',
            status: 'Active',
            photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80',
            dob: '2004-02-10',
            gender: 'Female',
            guardian: 'Elena Martinez (+1 555-777-3344)'
        },
        {
            id: 'STU-2024-102',
            name: 'James Wilson',
            rollNo: 'ME2024-102',
            department: 'Mechanical Engineering',
            semester: '7th Semester',
            email: 'j.wilson@apex.edu',
            phone: '+1 (555) 567-8901',
            gpa: 3.15,
            attendance: 68,
            feeStatus: 'Overdue',
            status: 'Active',
            photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
            dob: '2002-11-05',
            gender: 'Male',
            guardian: 'Thomas Wilson (+1 555-666-4455)'
        },
        {
            id: 'STU-2024-055',
            name: 'Emily Taylor',
            rollNo: 'CE2024-055',
            department: 'Civil Engineering',
            semester: '5th Semester',
            email: 'e.taylor@apex.edu',
            phone: '+1 (555) 678-9012',
            gpa: 3.78,
            attendance: 88,
            feeStatus: 'Paid',
            status: 'Active',
            photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80',
            dob: '2003-09-18',
            gender: 'Female',
            guardian: 'Sarah Taylor (+1 555-555-5566)'
        },
        {
            id: 'STU-2024-073',
            name: 'Aarav Patel',
            rollNo: 'CS2024-073',
            department: 'Computer Science & Engineering',
            semester: '5th Semester',
            email: 'a.patel@apex.edu',
            phone: '+1 (555) 789-0123',
            gpa: 3.88,
            attendance: 94,
            feeStatus: 'Paid',
            status: 'Active',
            photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
            dob: '2003-04-12',
            gender: 'Male',
            guardian: 'Rajesh Patel (+1 555-444-6677)'
        },
        {
            id: 'STU-2024-118',
            name: 'Olivia Brown',
            rollNo: 'IT2024-118',
            department: 'Information Technology',
            semester: '3rd Semester',
            email: 'o.brown@apex.edu',
            phone: '+1 (555) 890-1234',
            gpa: 3.60,
            attendance: 84,
            feeStatus: 'Pending',
            status: 'Active',
            photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&auto=format&fit=crop&q=80',
            dob: '2004-06-30',
            gender: 'Female',
            guardian: 'Michael Brown (+1 555-333-7788)'
        },
        {
            id: 'STU-2024-064',
            name: 'Marcus Johnson',
            rollNo: 'EE2024-064',
            department: 'Electrical Engineering',
            semester: '7th Semester',
            email: 'm.johnson@apex.edu',
            phone: '+1 (555) 901-2345',
            gpa: 2.92,
            attendance: 71,
            feeStatus: 'Overdue',
            status: 'Active',
            photo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80',
            dob: '2002-12-15',
            gender: 'Male',
            guardian: 'Robert Johnson (+1 555-222-8899)'
        }
    ],
    faculty: [
        {
            id: 'FAC-108',
            name: 'Dr. Robert Vance',
            department: 'Computer Science & Engineering',
            designation: 'Senior Professor & HOD',
            email: 'r.vance@apex.edu',
            phone: '+1 (555) 111-2233',
            courses: ['CS301 - Data Structures & Algorithms', 'CS502 - Database Systems'],
            office: 'Block A, Room 304'
        },
        {
            id: 'FAC-112',
            name: 'Dr. Elena Rostova',
            department: 'Computer Science & Engineering',
            designation: 'Associate Professor',
            email: 'e.rostova@apex.edu',
            phone: '+1 (555) 222-3344',
            courses: ['CS405 - Web Technologies', 'CS601 - Cloud Computing'],
            office: 'Block A, Room 308'
        },
        {
            id: 'FAC-205',
            name: 'Prof. Alan Turing Jr.',
            department: 'Information Technology',
            designation: 'Assistant Professor',
            email: 'a.turing@apex.edu',
            phone: '+1 (555) 333-4455',
            courses: ['IT302 - Software Engineering', 'IT504 - Machine Learning'],
            office: 'Block B, Room 210'
        },
        {
            id: 'FAC-301',
            name: 'Dr. Sarah Connor',
            department: 'Electronics & Communication',
            designation: 'Professor',
            email: 's.connor@apex.edu',
            phone: '+1 (555) 444-5566',
            courses: ['EC301 - Digital Signal Processing', 'EC402 - Microcontrollers'],
            office: 'Block C, Room 105'
        }
    ],
    courses: [
        {
            code: 'CS301',
            name: 'Data Structures & Algorithms',
            department: 'Computer Science & Engineering',
            semester: '5th Semester',
            credits: 4,
            instructor: 'Dr. Robert Vance',
            schedule: 'Mon, Wed, Fri (09:00 AM - 10:00 AM)',
            room: 'Lab 3, Tech Building',
            enrolled: 48,
            capacity: 60
        },
        {
            code: 'CS502',
            name: 'Database Management Systems',
            department: 'Computer Science & Engineering',
            semester: '5th Semester',
            credits: 4,
            instructor: 'Dr. Robert Vance',
            schedule: 'Tue, Thu (11:00 AM - 12:30 PM)',
            room: 'Hall 201, Main Block',
            enrolled: 52,
            capacity: 60
        },
        {
            code: 'CS405',
            name: 'Full Stack Web Development',
            department: 'Computer Science & Engineering',
            semester: '5th Semester',
            credits: 3,
            instructor: 'Dr. Elena Rostova',
            schedule: 'Mon, Wed (02:00 PM - 03:30 PM)',
            room: 'Software Lab 1',
            enrolled: 55,
            capacity: 60
        },
        {
            code: 'IT302',
            name: 'Software Engineering & Agile',
            department: 'Information Technology',
            semester: '5th Semester',
            credits: 3,
            instructor: 'Prof. Alan Turing Jr.',
            schedule: 'Tue, Thu (09:30 AM - 11:00 AM)',
            room: 'Room 305, Tech Block',
            enrolled: 42,
            capacity: 50
        },
        {
            code: 'EC301',
            name: 'Digital Signal Processing',
            department: 'Electronics & Communication',
            semester: '3rd Semester',
            credits: 4,
            instructor: 'Dr. Sarah Connor',
            schedule: 'Mon, Fri (11:00 AM - 12:30 PM)',
            room: 'ECE Seminar Hall',
            enrolled: 38,
            capacity: 50
        },
        {
            code: 'ME401',
            name: 'Thermodynamics & Heat Transfer',
            department: 'Mechanical Engineering',
            semester: '7th Semester',
            credits: 4,
            instructor: 'Prof. Richard Feynman',
            schedule: 'Wed, Fri (02:00 PM - 03:30 PM)',
            room: 'Mech Lab 2',
            enrolled: 45,
            capacity: 50
        }
    ],
    studentAttendance: [
        { courseCode: 'CS301', courseName: 'Data Structures & Algorithms', totalClasses: 40, attended: 37, percentage: 92.5, warning: false },
        { courseCode: 'CS502', courseName: 'Database Management Systems', totalClasses: 36, attended: 34, percentage: 94.4, warning: false },
        { courseCode: 'CS405', courseName: 'Full Stack Web Development', totalClasses: 30, attended: 27, percentage: 90.0, warning: false },
        { courseCode: 'IT302', courseName: 'Software Engineering', totalClasses: 32, attended: 28, percentage: 87.5, warning: false },
        { courseCode: 'MA301', courseName: 'Discrete Mathematics', totalClasses: 28, attended: 24, percentage: 85.7, warning: false }
    ],
    timetable: [
        { day: 'Monday', time: '09:00 - 10:00 AM', code: 'CS301', title: 'Data Structures & Algorithms', room: 'Lab 3', teacher: 'Dr. Robert Vance' },
        { day: 'Monday', time: '11:00 - 12:00 PM', code: 'MA301', title: 'Discrete Mathematics', room: 'Hall 102', teacher: 'Prof. H. Curie' },
        { day: 'Monday', time: '02:00 - 03:30 PM', code: 'CS405', title: 'Web Development Lab', room: 'Lab 1', teacher: 'Dr. Elena Rostova' },
        
        { day: 'Tuesday', time: '09:30 - 11:00 AM', code: 'IT302', title: 'Software Engineering', room: 'Room 305', teacher: 'Prof. Alan Turing' },
        { day: 'Tuesday', time: '11:00 - 12:30 PM', code: 'CS502', title: 'Database Systems', room: 'Hall 201', teacher: 'Dr. Robert Vance' },
        
        { day: 'Wednesday', time: '09:00 - 10:00 AM', code: 'CS301', title: 'Data Structures & Algorithms', room: 'Lab 3', teacher: 'Dr. Robert Vance' },
        { day: 'Wednesday', time: '02:00 - 03:30 PM', code: 'CS405', title: 'Web Development Lecture', room: 'Hall 104', teacher: 'Dr. Elena Rostova' },
        
        { day: 'Thursday', time: '09:30 - 11:00 AM', code: 'IT302', title: 'Software Engineering', room: 'Room 305', teacher: 'Prof. Alan Turing' },
        { day: 'Thursday', time: '11:00 - 12:30 PM', code: 'CS502', title: 'Database Systems Lab', room: 'Lab 2', teacher: 'Dr. Robert Vance' },
        
        { day: 'Friday', time: '09:00 - 10:00 AM', code: 'CS301', title: 'Data Structures & Algorithms', room: 'Lab 3', teacher: 'Dr. Robert Vance' },
        { day: 'Friday', time: '02:00 - 04:00 PM', code: 'PROJ501', title: 'Minor Project Review', room: 'Conf Room A', teacher: 'Panel Faculty' }
    ],
    assignments: [
        {
            id: 'ASN-101',
            courseCode: 'CS301',
            title: 'Red-Black Trees & B-Trees Implementation',
            dueDate: '2026-09-24',
            totalMarks: 100,
            status: 'Pending',
            submittedOn: null,
            grade: null,
            feedback: '',
            description: 'Implement a self-balancing Red-Black Tree data structure in C++ or Java with full deletion operations.'
        },
        {
            id: 'ASN-102',
            courseCode: 'CS502',
            title: 'Complex SQL Queries & Index Optimization',
            dueDate: '2026-09-20',
            totalMarks: 50,
            status: 'Submitted',
            submittedOn: '2026-09-16',
            grade: 'Pending Evaluation',
            feedback: '',
            description: 'Write optimized multi-table JOIN queries and benchmark indexing strategies on PostgreSQL.'
        },
        {
            id: 'ASN-103',
            courseCode: 'CS405',
            title: 'REST API & Dynamic Dashboard UI',
            dueDate: '2026-09-10',
            totalMarks: 100,
            status: 'Graded',
            submittedOn: '2026-09-09',
            grade: '96/100 (A+)',
            feedback: 'Exceptional UI design, clean reactive architecture, and great documentation.',
            description: 'Build a dynamic single-page web app with responsive layout and state persistence.'
        }
    ],
    grades: [
        { semester: '1st Semester', sgpa: 3.75, cgpa: 3.75, status: 'Completed', totalCredits: 20 },
        { semester: '2nd Semester', sgpa: 3.80, cgpa: 3.78, status: 'Completed', totalCredits: 22 },
        { semester: '3rd Semester', sgpa: 3.85, cgpa: 3.80, status: 'Completed', totalCredits: 21 },
        { semester: '4th Semester', sgpa: 3.88, cgpa: 3.82, status: 'Completed', totalCredits: 22 },
        { semester: '5th Semester (Current)', sgpa: 3.82, cgpa: 3.82, status: 'In Progress', totalCredits: 20 }
    ],
    fees: [
        {
            id: 'INV-2026-001',
            description: 'Tuition Fee - Fall Semester 2026',
            dueDate: '2026-08-31',
            amount: 4500,
            paidAmount: 4500,
            status: 'Paid',
            receiptNo: 'REC-99214',
            paymentDate: '2026-08-25'
        },
        {
            id: 'INV-2026-002',
            description: 'Advanced Computing Lab & Library Pass',
            dueDate: '2026-09-15',
            amount: 350,
            paidAmount: 350,
            status: 'Paid',
            receiptNo: 'REC-99430',
            paymentDate: '2026-09-05'
        },
        {
            id: 'INV-2026-003',
            description: 'End-Semester Examination Fee',
            dueDate: '2026-10-15',
            amount: 150,
            paidAmount: 0,
            status: 'Pending',
            receiptNo: null,
            paymentDate: null
        }
    ],
    studyMaterials: [
        {
            id: 'MAT-001',
            title: 'Data Structures - Complete Lecture Notes & Code Snippets',
            courseCode: 'CS301',
            category: 'Lecture Slides',
            author: 'Dr. Robert Vance',
            uploadDate: '2026-09-02',
            fileSize: '4.8 MB',
            type: 'pdf',
            downloadCount: 142,
            content: 'Apex Institute of Technology & Science\nCourse: CS301 Data Structures & Algorithms\nLecture Notes: Trees, Graphs, Sorting Algorithms, Dynamic Programming.'
        },
        {
            id: 'MAT-002',
            title: 'Database Normalization & BCNF Cheat Sheet',
            courseCode: 'CS502',
            category: 'Reference Manual',
            author: 'Dr. Robert Vance',
            uploadDate: '2026-09-08',
            fileSize: '1.9 MB',
            type: 'pdf',
            downloadCount: 98,
            content: 'Apex Institute - CS502 DBMS\nGuide on 1NF, 2NF, 3NF, BCNF Decomposition and Lossless Join Property.'
        },
        {
            id: 'MAT-003',
            title: 'Full Stack Web Dev - Lab Assignment Starter Guide',
            courseCode: 'CS405',
            category: 'Lab Guide',
            author: 'Dr. Elena Rostova',
            uploadDate: '2026-09-12',
            fileSize: '2.5 MB',
            type: 'zip',
            downloadCount: 175,
            content: 'Apex Institute - CS405 Full Stack Web Dev\nSetup instructions for HTML5, Tailwind CSS, JavaScript ES6 APIs and Chart.js integration.'
        }
    ],
    notices: [
        {
            id: 'NOT-201',
            title: 'Mid-Semester Examinations Schedule Announcement',
            category: 'Exam',
            priority: 'High',
            target: 'All Students',
            date: '2026-09-15',
            author: 'Office of Controller of Examinations',
            content: 'The Mid-Semester examinations for 3rd, 5th, and 7th semesters will commence from October 12, 2026. Detailed date sheets have been published on the notice board and portal.',
            read: false
        },
        {
            id: 'NOT-202',
            title: 'Annual TechFest "Apex Hack 2026" Registration Open',
            category: 'Event',
            priority: 'Medium',
            target: 'All Students & Faculty',
            date: '2026-09-14',
            author: 'Student Activity Council',
            content: 'Register your teams of 3-4 members for the 36-hour flagship hackathon. Exciting cash prizes worth $10,000 up for grabs!',
            read: true
        },
        {
            id: 'NOT-203',
            title: 'Attendance Policy Reminder: Mandatory 75% Threshold',
            category: 'Urgent',
            priority: 'High',
            target: 'All Students',
            date: '2026-09-10',
            author: 'Academic Registrar',
            content: 'Students with overall attendance below 75% as of September 30 will be debarred from appearing in internal lab practicals without official medical waivers.',
            read: false
        }
    ]
};

// Initialize LocalStorage Data Store
function initStorage() {
    if (!localStorage.getItem('AITS_SMS_DATA')) {
        localStorage.setItem('AITS_SMS_DATA', JSON.stringify(SEED_DATA));
    }
}

function getAppData() {
    initStorage();
    try {
        return JSON.parse(localStorage.getItem('AITS_SMS_DATA')) || SEED_DATA;
    } catch (e) {
        console.error('Error parsing local storage:', e);
        return SEED_DATA;
    }
}

function saveAppData(data) {
    try {
        localStorage.setItem('AITS_SMS_DATA', JSON.stringify(data));
    } catch (e) {
        console.error('Error saving local storage:', e);
    }
}

// Reset data back to default seed
function resetAppData() {
    localStorage.setItem('AITS_SMS_DATA', JSON.stringify(SEED_DATA));
}
