/**
 * Core Application Logic & View Router
 * Apex Institute of Technology & Science - SMS Portal
 */

let appData = getAppData();
let currentRole = 'landing'; // 'landing', 'student', 'faculty', 'admin'
let activeTab = 'overview';

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    appData = getAppData();
    switchRole('landing');
    renderNotifications();
}

// Global Role Switcher
function switchRole(role) {
    currentRole = role;
    const landingView = document.getElementById('view-landing');
    const dashboardContainer = document.getElementById('view-dashboard-container');
    const navLandingLinks = document.getElementById('nav-landing-links');
    const navNotifications = document.getElementById('nav-notifications');
    const currentRoleBadge = document.getElementById('current-role-badge');
    const navUserProfile = document.getElementById('nav-user-profile');

    if (role === 'landing') {
        landingView.classList.remove('hidden');
        dashboardContainer.classList.add('hidden');
        navLandingLinks.classList.remove('hidden');
        navNotifications.classList.add('hidden');
        currentRoleBadge.textContent = 'Demo Role: Landing';
        
        navUserProfile.innerHTML = `
            <button onclick="openAuthModal()" class="bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs px-4 py-2 rounded-xl shadow-md transition flex items-center gap-2">
                <i class="fa-solid fa-right-to-bracket"></i> Sign In
            </button>
        `;
    } else {
        landingView.classList.add('hidden');
        dashboardContainer.classList.remove('hidden');
        navLandingLinks.classList.add('hidden');
        navNotifications.classList.remove('hidden');

        // Setup Sidebar & Role Profile Information
        setupSidebarForRole(role);
        
        // Select Default Tab per role
        if (role === 'student') {
            currentRoleBadge.textContent = 'Portal: Student';
            showRoleTab('student-overview');
        } else if (role === 'faculty') {
            currentRoleBadge.textContent = 'Portal: Faculty';
            showRoleTab('faculty-attendance');
        } else if (role === 'admin') {
            currentRoleBadge.textContent = 'Portal: Admin';
            showRoleTab('admin-students');
        }
    }
}

// Setup Sidebar Links and User Avatar for Active Role
function setupSidebarForRole(role) {
    const sidebarAvatar = document.getElementById('sidebar-user-avatar');
    const sidebarName = document.getElementById('sidebar-user-name');
    const sidebarRole = document.getElementById('sidebar-user-role');
    const sidebarNavLinks = document.getElementById('sidebar-nav-links');
    const navUserProfile = document.getElementById('nav-user-profile');

    let userPhoto = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80';
    let userName = 'Alex Morgan';
    let userRoleTitle = 'Student';

    let linksHTML = '';

    if (role === 'student') {
        userPhoto = appData.currentUser.photo;
        userName = appData.currentUser.name;
        userRoleTitle = 'Student (Sem 5)';

        linksHTML = `
            <button onclick="showRoleTab('student-overview')" id="nav-tab-student-overview" class="sidebar-link w-full text-left px-3 py-2.5 rounded-xl flex items-center space-x-3 text-slate-700">
                <i class="fa-solid fa-house text-blue-600 w-5"></i><span>Dashboard Overview</span>
            </button>
            <button onclick="showRoleTab('student-attendance')" id="nav-tab-student-attendance" class="sidebar-link w-full text-left px-3 py-2.5 rounded-xl flex items-center space-x-3 text-slate-700">
                <i class="fa-solid fa-chart-pie text-emerald-600 w-5"></i><span>Attendance Tracker</span>
            </button>
            <button onclick="showRoleTab('student-grades')" id="nav-tab-student-grades" class="sidebar-link w-full text-left px-3 py-2.5 rounded-xl flex items-center space-x-3 text-slate-700">
                <i class="fa-solid fa-graduation-cap text-amber-600 w-5"></i><span>Grades & SGPA</span>
            </button>
            <button onclick="showRoleTab('student-timetable')" id="nav-tab-student-timetable" class="sidebar-link w-full text-left px-3 py-2.5 rounded-xl flex items-center space-x-3 text-slate-700">
                <i class="fa-solid fa-calendar-days text-purple-600 w-5"></i><span>Class Timetable</span>
            </button>
            <button onclick="showRoleTab('student-assignments')" id="nav-tab-student-assignments" class="sidebar-link w-full text-left px-3 py-2.5 rounded-xl flex items-center space-x-3 text-slate-700">
                <i class="fa-solid fa-list-check text-indigo-600 w-5"></i><span>Assignments</span>
            </button>
            <button onclick="showRoleTab('student-fees')" id="nav-tab-student-fees" class="sidebar-link w-full text-left px-3 py-2.5 rounded-xl flex items-center space-x-3 text-slate-700">
                <i class="fa-solid fa-receipt text-emerald-600 w-5"></i><span>Fee Ledger & Receipt</span>
            </button>
            <button onclick="showRoleTab('student-materials')" id="nav-tab-student-materials" class="sidebar-link w-full text-left px-3 py-2.5 rounded-xl flex items-center space-x-3 text-slate-700">
                <i class="fa-solid fa-folder-open text-rose-600 w-5"></i><span>Study Materials</span>
            </button>
            <button onclick="showRoleTab('announcements')" id="nav-tab-announcements" class="sidebar-link w-full text-left px-3 py-2.5 rounded-xl flex items-center space-x-3 text-slate-700">
                <i class="fa-solid fa-bullhorn text-blue-600 w-5"></i><span>Announcements</span>
            </button>
        `;
    } else if (role === 'faculty') {
        userPhoto = 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=100&auto=format&fit=crop&q=80';
        userName = 'Dr. Robert Vance';
        userRoleTitle = 'Senior Professor & HOD';

        linksHTML = `
            <button onclick="showRoleTab('faculty-attendance')" id="nav-tab-faculty-attendance" class="sidebar-link w-full text-left px-3 py-2.5 rounded-xl flex items-center space-x-3 text-slate-700">
                <i class="fa-solid fa-clipboard-user text-emerald-600 w-5"></i><span>Mark Attendance</span>
            </button>
            <button onclick="showRoleTab('faculty-grades')" id="nav-tab-faculty-grades" class="sidebar-link w-full text-left px-3 py-2.5 rounded-xl flex items-center space-x-3 text-slate-700">
                <i class="fa-solid fa-pen-to-square text-amber-600 w-5"></i><span>Grade Submission</span>
            </button>
            <button onclick="showRoleTab('faculty-materials')" id="nav-tab-faculty-materials" class="sidebar-link w-full text-left px-3 py-2.5 rounded-xl flex items-center space-x-3 text-slate-700">
                <i class="fa-solid fa-cloud-arrow-up text-blue-600 w-5"></i><span>Upload Materials</span>
            </button>
            <button onclick="showRoleTab('announcements')" id="nav-tab-announcements" class="sidebar-link w-full text-left px-3 py-2.5 rounded-xl flex items-center space-x-3 text-slate-700">
                <i class="fa-solid fa-bullhorn text-indigo-600 w-5"></i><span>Class Circulars</span>
            </button>
        `;
    } else if (role === 'admin') {
        userPhoto = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80';
        userName = 'Sarah Jenkins';
        userRoleTitle = 'Academic Registrar';

        linksHTML = `
            <button onclick="showRoleTab('admin-students')" id="nav-tab-admin-students" class="sidebar-link w-full text-left px-3 py-2.5 rounded-xl flex items-center space-x-3 text-slate-700">
                <i class="fa-solid fa-users text-blue-600 w-5"></i><span>Student Records</span>
            </button>
            <button onclick="showRoleTab('admin-courses')" id="nav-tab-admin-courses" class="sidebar-link w-full text-left px-3 py-2.5 rounded-xl flex items-center space-x-3 text-slate-700">
                <i class="fa-solid fa-book text-emerald-600 w-5"></i><span>Course Directory</span>
            </button>
            <button onclick="showRoleTab('admin-faculty')" id="nav-tab-admin-faculty" class="sidebar-link w-full text-left px-3 py-2.5 rounded-xl flex items-center space-x-3 text-slate-700">
                <i class="fa-solid fa-user-tie text-purple-600 w-5"></i><span>Faculty Members</span>
            </button>
            <button onclick="showRoleTab('admin-notices')" id="nav-tab-admin-notices" class="sidebar-link w-full text-left px-3 py-2.5 rounded-xl flex items-center space-x-3 text-slate-700">
                <i class="fa-solid fa-bullhorn text-amber-600 w-5"></i><span>Broadcaster</span>
            </button>
            <button onclick="showRoleTab('admin-analytics')" id="nav-tab-admin-analytics" class="sidebar-link w-full text-left px-3 py-2.5 rounded-xl flex items-center space-x-3 text-slate-700">
                <i class="fa-solid fa-chart-column text-rose-600 w-5"></i><span>College Analytics</span>
            </button>
        `;
    }

    sidebarAvatar.src = userPhoto;
    sidebarName.textContent = userName;
    sidebarRole.textContent = userRoleTitle;
    sidebarNavLinks.innerHTML = linksHTML;

    navUserProfile.innerHTML = `
        <div class="flex items-center space-x-2 border-l border-slate-700 pl-3">
            <img src="${userPhoto}" class="w-8 h-8 rounded-full object-cover border border-slate-600">
            <span class="text-xs font-semibold text-slate-200 hidden sm:inline">${userName}</span>
            <button onclick="switchRole('landing')" class="text-slate-400 hover:text-white p-1 text-xs" title="Sign Out">
                <i class="fa-solid fa-power-off"></i>
            </button>
        </div>
    `;
}

// Tab Switcher Router
function showRoleTab(tabKey) {
    activeTab = tabKey;
    
    // Highlight Active Sidebar Link
    document.querySelectorAll('.sidebar-link').forEach(link => link.classList.remove('active'));
    const activeLink = document.getElementById(`nav-tab-${tabKey}`);
    if (activeLink) activeLink.classList.add('active');

    const contentArea = document.getElementById('tab-content-area');
    const pageTitle = document.getElementById('page-title');
    const pageSubtitle = document.getElementById('page-subtitle');
    const headerActions = document.getElementById('header-action-buttons');
    headerActions.innerHTML = '';

    // Render Tab Views
    switch (tabKey) {
        // STUDENT TABS
        case 'student-overview':
            pageTitle.textContent = 'Student Academic Overview';
            pageSubtitle.textContent = `Welcome back, ${appData.currentUser.name}! Here is your real-time status.`;
            contentArea.innerHTML = renderStudentOverviewTab();
            setTimeout(() => {
                renderStudentAttendanceChart('chart-overview-attendance', appData.studentAttendance);
            }, 100);
            break;

        case 'student-attendance':
            pageTitle.textContent = 'Subject Attendance Tracker';
            pageSubtitle.textContent = 'Maintain 75%+ threshold to qualify for semester examinations.';
            contentArea.innerHTML = renderStudentAttendanceTab();
            setTimeout(() => {
                renderStudentAttendanceChart('chart-attendance-detail', appData.studentAttendance);
            }, 100);
            break;

        case 'student-grades':
            pageTitle.textContent = 'Grades & Academic Performance';
            pageSubtitle.textContent = 'Track semester SGPA trends and course credit breakdowns.';
            headerActions.innerHTML = `
                <button onclick="downloadTranscript()" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-4 py-2 rounded-xl shadow-md transition flex items-center gap-2">
                    <i class="fa-solid fa-file-pdf"></i> Download Official Transcript
                </button>
            `;
            contentArea.innerHTML = renderStudentGradesTab();
            setTimeout(() => {
                renderStudentGPAChart('chart-gpa-trend', appData.grades);
            }, 100);
            break;

        case 'student-timetable':
            pageTitle.textContent = 'Weekly Class Schedule';
            pageSubtitle.textContent = 'Live timetable view with lecture hall numbers and professors.';
            contentArea.innerHTML = renderStudentTimetableTab();
            break;

        case 'student-assignments':
            pageTitle.textContent = 'Assignments & Submissions Portal';
            pageSubtitle.textContent = 'Upload completed coursework before specified deadlines.';
            contentArea.innerHTML = renderStudentAssignmentsTab();
            break;

        case 'student-fees':
            pageTitle.textContent = 'Fee Ledger & Payment Center';
            pageSubtitle.textContent = 'View tuition invoices, pending dues, and download receipts.';
            contentArea.innerHTML = renderStudentFeesTab();
            break;

        case 'student-materials':
            pageTitle.textContent = 'Digital Study Materials & Repository';
            pageSubtitle.textContent = 'Download course lecture notes, reference PDFs, and lab manuals.';
            contentArea.innerHTML = renderStudentMaterialsTab();
            break;

        // FACULTY TABS
        case 'faculty-attendance':
            pageTitle.textContent = 'Class Attendance Marker';
            pageSubtitle.textContent = 'Select course and mark student present / absent roster status.';
            contentArea.innerHTML = renderFacultyAttendanceTab();
            break;

        case 'faculty-grades':
            pageTitle.textContent = 'Student Evaluation & Grade Entry';
            pageSubtitle.textContent = 'Input test scores and automatically compute letter grades.';
            contentArea.innerHTML = renderFacultyGradesTab();
            setTimeout(() => {
                renderFacultyGradeChart('chart-faculty-grades');
            }, 100);
            break;

        case 'faculty-materials':
            pageTitle.textContent = 'Upload Course Materials & Homework';
            pageSubtitle.textContent = 'Publish lecture notes, assignments, and reference documents.';
            contentArea.innerHTML = renderFacultyMaterialsTab();
            break;

        // ADMIN TABS
        case 'admin-students':
            pageTitle.textContent = 'Student Records Management';
            pageSubtitle.textContent = 'Search, filter, sort, add, edit, or remove student profiles.';
            headerActions.innerHTML = `
                <button onclick="openAddStudentModal()" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-4 py-2 rounded-xl shadow-md transition flex items-center gap-2">
                    <i class="fa-solid fa-user-plus"></i> Add New Student
                </button>
            `;
            contentArea.innerHTML = renderAdminStudentsTab();
            break;

        case 'admin-courses':
            pageTitle.textContent = 'College Course Management';
            pageSubtitle.textContent = 'Manage active academic courses, credit hours, and assigned instructors.';
            contentArea.innerHTML = renderAdminCoursesTab();
            break;

        case 'admin-faculty':
            pageTitle.textContent = 'Faculty & Staff Directory';
            pageSubtitle.textContent = 'Overview of teaching faculty across departments.';
            contentArea.innerHTML = renderAdminFacultyTab();
            break;

        case 'admin-notices':
            pageTitle.textContent = 'College Notice Broadcaster';
            pageSubtitle.textContent = 'Publish urgent announcements and notices to student portals.';
            contentArea.innerHTML = renderAdminNoticesTab();
            break;

        case 'admin-analytics':
            pageTitle.textContent = 'College Executive Analytics';
            pageSubtitle.textContent = 'Departmental attendance averages and fee collection metrics.';
            contentArea.innerHTML = renderAdminAnalyticsTab();
            setTimeout(() => {
                renderAdminAttendanceChart('chart-admin-attendance');
                renderAdminFeeChart('chart-admin-fee');
            }, 100);
            break;

        case 'announcements':
            pageTitle.textContent = 'College Announcements & Alerts';
            pageSubtitle.textContent = 'Official circulars, exam notifications, and campus events.';
            contentArea.innerHTML = renderAnnouncementsTab();
            break;
    }
}

/* ========================================== */
/* STUDENT TAB RENDERERS                      */
/* ========================================== */

function renderStudentOverviewTab() {
    const user = appData.currentUser;
    const nextClass = appData.timetable[0];

    return `
        <!-- Top Profile Banner -->
        <div class="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white rounded-3xl p-6 shadow-xl mb-8 border border-slate-800">
            <div class="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div class="flex items-center gap-5 text-center sm:text-left">
                    <img src="${user.photo}" class="w-20 h-20 rounded-2xl object-cover border-2 border-white/20 shadow-lg">
                    <div>
                        <h2 class="text-2xl font-extrabold tracking-tight">${user.name}</h2>
                        <p class="text-xs text-blue-200 mt-1">Roll No: ${user.rollNo} &bull; ${user.department}</p>
                        <div class="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start text-xs">
                            <span class="bg-blue-800/60 px-3 py-1 rounded-lg border border-blue-400/20 font-medium">${user.semester}</span>
                            <span class="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-lg border border-emerald-500/30 font-semibold">Fee Status: ${user.feeStatus}</span>
                        </div>
                    </div>
                </div>
                <div class="flex gap-4 text-center">
                    <div class="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10">
                        <span class="text-xs text-slate-300 block">Current GPA</span>
                        <span class="text-2xl font-extrabold text-amber-400">${user.gpa}</span>
                    </div>
                    <div class="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10">
                        <span class="text-xs text-slate-300 block">Attendance</span>
                        <span class="text-2xl font-extrabold text-emerald-400">${user.attendance}%</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Quick Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl">
                    <i class="fa-solid fa-clock"></i>
                </div>
                <div>
                    <span class="text-xs font-semibold text-slate-400 block uppercase">Next Up Today</span>
                    <h4 class="font-bold text-sm text-slate-900">${nextClass.code}: ${nextClass.title}</h4>
                    <p class="text-xs text-slate-500">${nextClass.time} &bull; ${nextClass.room}</p>
                </div>
            </div>

            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-xl">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                </div>
                <div>
                    <span class="text-xs font-semibold text-slate-400 block uppercase">Pending Assignment</span>
                    <h4 class="font-bold text-sm text-slate-900">Red-Black Trees Implementation</h4>
                    <p class="text-xs text-rose-500 font-semibold">Due in 7 days (Sep 24)</p>
                </div>
            </div>

            <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl">
                    <i class="fa-solid fa-circle-check"></i>
                </div>
                <div>
                    <span class="text-xs font-semibold text-slate-400 block uppercase">Fee Clearance</span>
                    <h4 class="font-bold text-sm text-emerald-600">All Dues Paid</h4>
                    <p class="text-xs text-slate-500">Receipt No: REC-99430</p>
                </div>
            </div>
        </div>

        <!-- Attendance Chart & Schedule Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div class="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <h3 class="font-bold text-base text-slate-900 mb-4 flex items-center justify-between">
                    <span>Attendance Distribution</span>
                    <span class="text-xs text-emerald-600 font-semibold">91.0% Avg</span>
                </h3>
                <div class="h-64 relative">
                    <canvas id="chart-overview-attendance"></canvas>
                </div>
            </div>

            <div class="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <h3 class="font-bold text-base text-slate-900 mb-4 flex items-center justify-between">
                    <span>Monday Schedule</span>
                    <button onclick="showRoleTab('student-timetable')" class="text-xs text-blue-600 font-semibold hover:underline">Full Timetable &rarr;</button>
                </h3>
                <div class="space-y-3">
                    ${appData.timetable.filter(t => t.day === 'Monday').map(t => `
                        <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 font-bold text-xs flex items-center justify-center">${t.code}</div>
                                <div>
                                    <h4 class="font-bold text-sm text-slate-900">${t.title}</h4>
                                    <p class="text-xs text-slate-500">${t.teacher} &bull; ${t.room}</p>
                                </div>
                            </div>
                            <span class="text-xs font-semibold text-blue-900 bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">${t.time}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function renderStudentAttendanceTab() {
    return `
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            <div class="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center">
                <h3 class="font-bold text-slate-900 text-base mb-2">Overall Attendance Rate</h3>
                <div class="h-56 relative my-4">
                    <canvas id="chart-attendance-detail"></canvas>
                </div>
                <div class="bg-emerald-50 text-emerald-800 text-xs p-3 rounded-2xl border border-emerald-200 font-medium">
                    <i class="fa-solid fa-circle-check text-emerald-600 mr-1"></i> You are safely above the mandatory 75% attendance threshold!
                </div>
            </div>

            <div class="lg:col-span-8 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h3 class="font-bold text-slate-900 text-base mb-4">Subject-wise Attendance Breakdown</h3>
                <div class="space-y-4">
                    ${appData.studentAttendance.map(item => `
                        <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                            <div class="flex justify-between items-center mb-2">
                                <div>
                                    <span class="font-bold text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">${item.courseCode}</span>
                                    <span class="font-bold text-sm text-slate-900 ml-2">${item.courseName}</span>
                                </div>
                                <span class="font-extrabold text-sm ${item.percentage >= 75 ? 'text-emerald-600' : 'text-rose-600'}">${item.percentage}%</span>
                            </div>
                            <div class="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                                <div class="bg-gradient-to-r ${item.percentage >= 75 ? 'from-blue-600 to-emerald-500' : 'from-rose-500 to-red-600'} h-2.5 rounded-full progress-bar-fill" style="width: ${item.percentage}%"></div>
                            </div>
                            <div class="flex justify-between text-[11px] text-slate-500 mt-2">
                                <span>Attended: ${item.attended} / ${item.totalClasses} classes</span>
                                <span>Absences: ${item.totalClasses - item.attended}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function renderStudentGradesTab() {
    return `
        <div id="printable-area" class="space-y-8">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div class="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                    <h3 class="font-bold text-slate-900 text-base mb-4">Semester SGPA Progression Trend</h3>
                    <div class="h-64">
                        <canvas id="chart-gpa-trend"></canvas>
                    </div>
                </div>

                <div class="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                        <h3 class="font-bold text-slate-900 text-base mb-4">Cumulative Summary</h3>
                        <div class="space-y-3">
                            <div class="flex justify-between p-3 bg-slate-50 rounded-xl">
                                <span class="text-xs text-slate-500">Cumulative GPA (CGPA)</span>
                                <span class="font-bold text-sm text-blue-900">3.82 / 4.00</span>
                            </div>
                            <div class="flex justify-between p-3 bg-slate-50 rounded-xl">
                                <span class="text-xs text-slate-500">Total Credits Completed</span>
                                <span class="font-bold text-sm text-slate-800">85 Credits</span>
                            </div>
                            <div class="flex justify-between p-3 bg-slate-50 rounded-xl">
                                <span class="text-xs text-slate-500">Academic Standing</span>
                                <span class="font-bold text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Dean's Honor Roll</span>
                            </div>
                        </div>
                    </div>
                    <p class="text-[11px] text-slate-400 mt-4">Official transcript generated from Apex Institute Controller of Exams DB.</p>
                </div>
            </div>

            <!-- Grades History Table -->
            <div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div class="p-6 border-b border-slate-100">
                    <h3 class="font-bold text-slate-900 text-base">Semester-wise Grade Ledger</h3>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-xs text-slate-600">
                        <thead class="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider border-b border-slate-200">
                            <tr>
                                <th class="p-4">Semester</th>
                                <th class="p-4">Total Credits</th>
                                <th class="p-4">SGPA</th>
                                <th class="p-4">CGPA</th>
                                <th class="p-4">Status</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100">
                            ${appData.grades.map(g => `
                                <tr class="hover:bg-slate-50/80">
                                    <td class="p-4 font-bold text-slate-900">${g.semester}</td>
                                    <td class="p-4">${g.totalCredits}</td>
                                    <td class="p-4 font-bold text-blue-600">${g.sgpa}</td>
                                    <td class="p-4 font-semibold">${g.cgpa}</td>
                                    <td class="p-4"><span class="badge-success text-[10px] font-bold px-2.5 py-1 rounded-full">${g.status}</span></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function renderStudentTimetableTab() {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    
    return `
        <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div class="flex items-center justify-between">
                <h3 class="font-bold text-slate-900 text-base">Semester 5 Lecture Schedule</h3>
                <span class="text-xs text-slate-500 font-medium"><i class="fa-solid fa-location-dot text-rose-500 mr-1"></i> Tech Building & Main Block</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
                ${days.map(day => {
                    const dayClasses = appData.timetable.filter(t => t.day === day);
                    return `
                        <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                            <h4 class="font-extrabold text-xs text-blue-900 uppercase border-b border-slate-200 pb-2 text-center">${day}</h4>
                            ${dayClasses.length > 0 ? dayClasses.map(c => `
                                <div class="timetable-card bg-white p-3 rounded-xl shadow-xs border border-slate-200 text-xs">
                                    <span class="text-[10px] font-bold text-blue-600 block">${c.time}</span>
                                    <h5 class="font-bold text-slate-900 mt-0.5">${c.code}</h5>
                                    <p class="text-[11px] text-slate-600 truncate">${c.title}</p>
                                    <p class="text-[10px] text-slate-400 mt-1"><i class="fa-solid fa-door-open"></i> ${c.room}</p>
                                </div>
                            `).join('') : '<p class="text-xs text-slate-400 text-center py-4">No Classes</p>'}
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}

function renderStudentAssignmentsTab() {
    return `
        <div class="space-y-6">
            <div class="flex items-center justify-between">
                <div class="flex space-x-2 text-xs font-semibold">
                    <span class="bg-blue-600 text-white px-3 py-1.5 rounded-xl">All Assignments (${appData.assignments.length})</span>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${appData.assignments.map(a => `
                    <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
                        <div class="space-y-2">
                            <div class="flex justify-between items-center">
                                <span class="bg-blue-50 text-blue-700 font-bold text-xs px-2.5 py-1 rounded-lg border border-blue-100">${a.courseCode}</span>
                                <span class="${a.status === 'Pending' ? 'badge-warning' : a.status === 'Submitted' ? 'badge-info' : 'badge-success'} text-xs font-bold px-2.5 py-1 rounded-full">${a.status}</span>
                            </div>
                            <h4 class="font-bold text-slate-900 text-sm">${a.title}</h4>
                            <p class="text-xs text-slate-500 leading-relaxed">${a.description}</p>
                        </div>
                        <div class="pt-3 border-t border-slate-100 text-xs space-y-2">
                            <div class="flex justify-between text-slate-500">
                                <span>Total Score: <strong>${a.totalMarks} Marks</strong></span>
                                <span>Due: <strong class="text-rose-600">${a.dueDate}</strong></span>
                            </div>
                            ${a.grade ? `<div class="bg-emerald-50 text-emerald-800 p-2 rounded-xl text-center font-bold">Grade: ${a.grade}</div>` : ''}
                            ${a.status === 'Pending' ? `
                                <button onclick="handleAssignmentSubmitModal('${a.id}')" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-xl transition text-xs flex items-center justify-center gap-2">
                                    <i class="fa-solid fa-cloud-arrow-up"></i> Upload Solution File
                                </button>
                            ` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderStudentFeesTab() {
    return `
        <div class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <span class="text-xs font-semibold text-slate-400 block uppercase">Total Semester Dues</span>
                    <span class="text-2xl font-extrabold text-slate-900">$5,000.00</span>
                </div>
                <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <span class="text-xs font-semibold text-slate-400 block uppercase">Amount Settled</span>
                    <span class="text-2xl font-extrabold text-emerald-600">$4,850.00</span>
                </div>
                <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                    <span class="text-xs font-semibold text-slate-400 block uppercase">Balance Due</span>
                    <span class="text-2xl font-extrabold text-amber-600">$150.00</span>
                </div>
            </div>

            <!-- Fees Table -->
            <div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div class="p-6 border-b border-slate-100 flex items-center justify-between">
                    <h3 class="font-bold text-slate-900 text-base">Fee Invoice History</h3>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-xs text-slate-600">
                        <thead class="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider border-b border-slate-200">
                            <tr>
                                <th class="p-4">Invoice ID</th>
                                <th class="p-4">Description</th>
                                <th class="p-4">Due Date</th>
                                <th class="p-4">Amount</th>
                                <th class="p-4">Status</th>
                                <th class="p-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100">
                            ${appData.fees.map(f => `
                                <tr class="hover:bg-slate-50/80">
                                    <td class="p-4 font-bold text-slate-900">${f.id}</td>
                                    <td class="p-4">${f.description}</td>
                                    <td class="p-4">${f.dueDate}</td>
                                    <td class="p-4 font-bold text-slate-900">$${f.amount}.00</td>
                                    <td class="p-4">
                                        <span class="${f.status === 'Paid' ? 'badge-success' : f.status === 'Pending' ? 'badge-warning' : 'badge-danger'} text-xs font-bold px-2.5 py-1 rounded-full">${f.status}</span>
                                    </td>
                                    <td class="p-4 text-right">
                                        ${f.status === 'Paid' ? `
                                            <button onclick="downloadFeeReceipt('${f.id}')" class="text-blue-600 hover:underline font-semibold flex items-center gap-1 ml-auto">
                                                <i class="fa-solid fa-download"></i> Receipt
                                            </button>
                                        ` : `
                                            <button onclick="openFeePayModal('${f.id}', '${f.description}', ${f.amount})" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-xl transition shadow-xs">
                                                Pay Online
                                            </button>
                                        `}
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function renderStudentMaterialsTab() {
    return `
        <div class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                ${appData.studyMaterials.map(m => `
                    <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition">
                        <div class="space-y-2">
                            <div class="flex justify-between items-center">
                                <span class="bg-slate-100 text-slate-700 font-bold text-xs px-2.5 py-1 rounded-lg border border-slate-200">${m.courseCode}</span>
                                <span class="text-[11px] text-slate-400 font-medium">${m.fileSize}</span>
                            </div>
                            <h4 class="font-bold text-slate-900 text-sm leading-snug">${m.title}</h4>
                            <p class="text-xs text-slate-500">Author: ${m.author} &bull; ${m.category}</p>
                        </div>
                        <div class="pt-3 border-t border-slate-100">
                            <button onclick="downloadStudyMaterial('${m.id}')" class="w-full bg-slate-900 hover:bg-blue-600 text-white font-bold py-2.5 rounded-xl transition text-xs flex items-center justify-center gap-2">
                                <i class="fa-solid fa-file-arrow-down"></i> Download File
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

/* ========================================== */
/* FACULTY TAB RENDERERS                      */
/* ========================================== */

function renderFacultyAttendanceTab() {
    const students = appData.students.filter(s => s.department === 'Computer Science & Engineering');

    return `
        <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div class="flex items-center gap-3">
                    <div>
                        <label class="block text-xs font-bold text-slate-500 uppercase">Active Course</label>
                        <select class="bg-slate-50 border border-slate-300 font-bold text-xs rounded-xl px-3 py-2 text-slate-800 focus:outline-none">
                            <option>CS301 - Data Structures & Algorithms</option>
                            <option>CS502 - Database Systems</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-slate-500 uppercase">Lecture Date</label>
                        <input type="date" value="2026-09-17" class="bg-slate-50 border border-slate-300 font-bold text-xs rounded-xl px-3 py-2 text-slate-800">
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <button onclick="markAllAttendance('Present')" class="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 font-bold text-xs px-3 py-2 rounded-xl transition">Mark All Present</button>
                    <button onclick="saveAttendanceRoster()" class="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-md transition">Save Attendance Sheet</button>
                </div>
            </div>

            <!-- Student Roster Table -->
            <div class="overflow-x-auto">
                <table class="w-full text-left text-xs text-slate-600">
                    <thead class="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider border-b border-slate-200">
                        <tr>
                            <th class="p-3">Roll No</th>
                            <th class="p-3">Student Name</th>
                            <th class="p-3">Cur. Attendance</th>
                            <th class="p-3 text-center">Status Action</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        ${students.map((s, idx) => `
                            <tr class="hover:bg-slate-50/80">
                                <td class="p-3 font-bold text-slate-900">${s.rollNo}</td>
                                <td class="p-3 flex items-center gap-3">
                                    <img src="${s.photo}" class="w-8 h-8 rounded-full object-cover">
                                    <span class="font-bold text-slate-900">${s.name}</span>
                                </td>
                                <td class="p-3 font-bold ${s.attendance >= 75 ? 'text-emerald-600' : 'text-rose-600'}">${s.attendance}%</td>
                                <td class="p-3 text-center">
                                    <div class="inline-flex rounded-xl p-1 bg-slate-100 border border-slate-200 text-xs font-semibold">
                                        <button id="att-pres-${idx}" onclick="setRosterStatus('${idx}', 'Present')" class="px-3 py-1 rounded-lg bg-emerald-600 text-white shadow-xs">Present</button>
                                        <button id="att-abs-${idx}" onclick="setRosterStatus('${idx}', 'Absent')" class="px-3 py-1 rounded-lg text-slate-600 hover:text-rose-600">Absent</button>
                                        <button id="att-late-${idx}" onclick="setRosterStatus('${idx}', 'Late')" class="px-3 py-1 rounded-lg text-slate-600 hover:text-amber-600">Late</button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function renderFacultyGradesTab() {
    return `
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div class="lg:col-span-8 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h3 class="font-bold text-slate-900 text-base border-b border-slate-100 pb-3">Internal Test Marks Submission</h3>
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-xs text-slate-600">
                        <thead class="bg-slate-50 font-bold text-slate-700 uppercase">
                            <tr>
                                <th class="p-3">Roll No</th>
                                <th class="p-3">Student</th>
                                <th class="p-3">Midterm (50)</th>
                                <th class="p-3">Quiz (20)</th>
                                <th class="p-3">Calculated Grade</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100">
                            <tr class="hover:bg-slate-50">
                                <td class="p-3 font-bold">CS2024-042</td>
                                <td class="p-3">Alex Morgan</td>
                                <td class="p-3"><input type="number" value="46" class="w-16 px-2 py-1 border rounded text-xs"></td>
                                <td class="p-3"><input type="number" value="19" class="w-16 px-2 py-1 border rounded text-xs"></td>
                                <td class="p-3 font-bold text-emerald-600">A+ (92.8%)</td>
                            </tr>
                            <tr class="hover:bg-slate-50">
                                <td class="p-3 font-bold">CS2024-015</td>
                                <td class="p-3">David Chen</td>
                                <td class="p-3"><input type="number" value="48" class="w-16 px-2 py-1 border rounded text-xs"></td>
                                <td class="p-3"><input type="number" value="20" class="w-16 px-2 py-1 border rounded text-xs"></td>
                                <td class="p-3 font-bold text-emerald-600">A+ (97.1%)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="text-right pt-2">
                    <button onclick="showToast('Grades successfully submitted to controller database!', 'success')" class="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-md">Publish Exam Grades</button>
                </div>
            </div>

            <div class="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <h3 class="font-bold text-slate-900 text-base mb-4">Class Grade Distribution</h3>
                <div class="h-60">
                    <canvas id="chart-faculty-grades"></canvas>
                </div>
            </div>
        </div>
    `;
}

function renderFacultyMaterialsTab() {
    return `
        <div class="max-w-2xl mx-auto bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 class="font-bold text-slate-900 text-base border-b border-slate-100 pb-3">Publish Study Notes or Homework</h3>
            <form onsubmit="handleFacultyUploadMaterial(event)" class="space-y-4 text-xs">
                <div>
                    <label class="block font-bold text-slate-700 mb-1">Document Title *</label>
                    <input type="text" id="faculty-upload-title" required placeholder="e.g. Chapter 4 - Graph Algorithms & Shortest Path" class="w-full px-3 py-2 rounded-xl border border-slate-300">
                </div>
                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <label class="block font-bold text-slate-700 mb-1">Course *</label>
                        <select id="faculty-upload-course" class="w-full px-3 py-2 rounded-xl border border-slate-300">
                            <option value="CS301">CS301 - Data Structures</option>
                            <option value="CS502">CS502 - Database Systems</option>
                        </select>
                    </div>
                    <div>
                        <label class="block font-bold text-slate-700 mb-1">Category</label>
                        <select id="faculty-upload-cat" class="w-full px-3 py-2 rounded-xl border border-slate-300">
                            <option value="Lecture Slides">Lecture Slides</option>
                            <option value="Lab Guide">Lab Guide</option>
                            <option value="Reference Manual">Reference Manual</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label class="block font-bold text-slate-700 mb-1">Select File (PDF, DOCX, ZIP)</label>
                    <input type="file" class="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100">
                </div>
                <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-md text-xs">
                    Upload & Notify Enrolled Students
                </button>
            </form>
        </div>
    `;
}

/* ========================================== */
/* ADMIN TAB RENDERERS                        */
/* ========================================== */

function renderAdminStudentsTab() {
    const students = appData.students;

    return `
        <div class="space-y-6">
            <!-- Filter & Search Controls -->
            <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                <div class="relative w-full md:w-80">
                    <i class="fa-solid fa-magnifying-glass absolute left-3 top-3 text-slate-400 text-xs"></i>
                    <input type="text" id="admin-search-input" onkeyup="filterStudentTable()" placeholder="Search by name, roll no, email..." class="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none">
                </div>
                
                <div class="flex flex-wrap items-center gap-3 w-full md:w-auto text-xs">
                    <select id="admin-dept-filter" onchange="filterStudentTable()" class="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-700 font-semibold focus:outline-none">
                        <option value="All">All Departments</option>
                        <option value="Computer Science & Engineering">Computer Science</option>
                        <option value="Electronics & Communication">Electronics</option>
                        <option value="Mechanical Engineering">Mechanical</option>
                        <option value="Civil Engineering">Civil</option>
                        <option value="Information Technology">Information Tech</option>
                    </select>

                    <select id="admin-sem-filter" onchange="filterStudentTable()" class="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-700 font-semibold focus:outline-none">
                        <option value="All">All Semesters</option>
                        <option value="1st Semester">1st Semester</option>
                        <option value="3rd Semester">3rd Semester</option>
                        <option value="5th Semester">5th Semester</option>
                        <option value="7th Semester">7th Semester</option>
                    </select>
                </div>
            </div>

            <!-- Student Records Table -->
            <div class="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div class="overflow-x-auto">
                    <table id="admin-student-table" class="w-full text-left text-xs text-slate-600">
                        <thead class="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider border-b border-slate-200">
                            <tr>
                                <th class="p-4">Student</th>
                                <th class="p-4">Roll No</th>
                                <th class="p-4">Department & Sem</th>
                                <th class="p-4">Attendance</th>
                                <th class="p-4">GPA</th>
                                <th class="p-4">Fee Status</th>
                                <th class="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody id="admin-student-tbody" class="divide-y divide-slate-100">
                            ${students.map(s => `
                                <tr class="hover:bg-slate-50/80">
                                    <td class="p-4 flex items-center gap-3">
                                        <img src="${s.photo}" class="w-9 h-9 rounded-full object-cover">
                                        <div>
                                            <span class="font-bold text-slate-900 block">${s.name}</span>
                                            <span class="text-[11px] text-slate-400">${s.email}</span>
                                        </div>
                                    </td>
                                    <td class="p-4 font-bold text-slate-800">${s.rollNo}</td>
                                    <td class="p-4">
                                        <span class="font-semibold block text-slate-800">${s.department}</span>
                                        <span class="text-[10px] text-slate-400">${s.semester}</span>
                                    </td>
                                    <td class="p-4 font-bold ${s.attendance >= 75 ? 'text-emerald-600' : 'text-rose-600'}">${s.attendance}%</td>
                                    <td class="p-4 font-extrabold text-blue-600">${s.gpa}</td>
                                    <td class="p-4">
                                        <span class="${s.feeStatus === 'Paid' ? 'badge-success' : s.feeStatus === 'Pending' ? 'badge-warning' : 'badge-danger'} text-[10px] font-bold px-2.5 py-1 rounded-full">${s.feeStatus}</span>
                                    </td>
                                    <td class="p-4 text-right space-x-2">
                                        <button onclick="openStudentProfileModal('${s.id}')" class="text-blue-600 hover:text-blue-800 p-1.5 rounded-lg hover:bg-blue-50" title="View Profile">
                                            <i class="fa-solid fa-eye"></i>
                                        </button>
                                        <button onclick="openEditStudentModal('${s.id}')" class="text-amber-600 hover:text-amber-800 p-1.5 rounded-lg hover:bg-amber-50" title="Edit Record">
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </button>
                                        <button onclick="deleteStudent('${s.id}')" class="text-rose-600 hover:text-rose-800 p-1.5 rounded-lg hover:bg-rose-50" title="Delete Student">
                                            <i class="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function renderAdminCoursesTab() {
    return `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${appData.courses.map(c => `
                <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
                    <div class="space-y-2">
                        <div class="flex justify-between items-center">
                            <span class="bg-blue-50 text-blue-700 font-bold text-xs px-2.5 py-1 rounded-lg border border-blue-100">${c.code} &bull; ${c.credits} Credits</span>
                            <span class="text-xs font-semibold text-slate-500">${c.enrolled}/${c.capacity} Enrolled</span>
                        </div>
                        <h4 class="font-bold text-slate-900 text-sm">${c.name}</h4>
                        <p class="text-xs text-slate-500"><i class="fa-solid fa-user-tie text-blue-600 mr-1"></i> ${c.instructor}</p>
                        <p class="text-xs text-slate-400"><i class="fa-solid fa-clock text-slate-400 mr-1"></i> ${c.schedule}</p>
                    </div>
                    <div class="pt-3 border-t border-slate-100 text-xs flex justify-between items-center">
                        <span class="text-slate-400 font-medium">${c.department}</span>
                        <button onclick="showToast('Course edit drawer opened', 'info')" class="text-blue-600 font-bold hover:underline">Manage</button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function renderAdminFacultyTab() {
    return `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            ${appData.faculty.map(f => `
                <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4">
                    <div class="w-14 h-14 rounded-2xl bg-blue-900 text-white font-bold flex items-center justify-center text-lg shadow-md flex-shrink-0">
                        ${f.name.split(' ').map(n=>n[0]).join('')}
                    </div>
                    <div class="space-y-1 text-xs">
                        <h4 class="font-bold text-sm text-slate-900">${f.name}</h4>
                        <p class="text-blue-600 font-semibold">${f.designation}</p>
                        <p class="text-slate-500">${f.department}</p>
                        <p class="text-slate-400">${f.email} &bull; ${f.phone}</p>
                        <div class="pt-2 flex flex-wrap gap-1">
                            ${f.courses.map(c => `<span class="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px]">${c}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function renderAdminNoticesTab() {
    return `
        <div class="max-w-3xl mx-auto bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 class="font-bold text-slate-900 text-base border-b border-slate-100 pb-3">Broadcast Official Circular / Notice</h3>
            <form onsubmit="handleAdminBroadcastNotice(event)" class="space-y-4 text-xs">
                <div>
                    <label class="block font-bold text-slate-700 mb-1">Notice Headline *</label>
                    <input type="text" id="notice-form-title" required placeholder="e.g. End-Semester Practical Exam Guidelines" class="w-full px-3 py-2 rounded-xl border border-slate-300">
                </div>
                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <label class="block font-bold text-slate-700 mb-1">Category</label>
                        <select id="notice-form-cat" class="w-full px-3 py-2 rounded-xl border border-slate-300">
                            <option value="Exam">Exam Schedule</option>
                            <option value="Urgent">Urgent Warning</option>
                            <option value="Event">Campus Event</option>
                        </select>
                    </div>
                    <div>
                        <label class="block font-bold text-slate-700 mb-1">Target Audience</label>
                        <select id="notice-form-target" class="w-full px-3 py-2 rounded-xl border border-slate-300">
                            <option value="All Students">All Enrolled Students</option>
                            <option value="Faculty Only">Faculty Members</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label class="block font-bold text-slate-700 mb-1">Notice Content *</label>
                    <textarea id="notice-form-content" rows="4" required class="w-full px-3 py-2 rounded-xl border border-slate-300"></textarea>
                </div>
                <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-md text-xs">
                    Broadcast Notice Instantly
                </button>
            </form>
        </div>
    `;
}

function renderAdminAnalyticsTab() {
    return `
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div class="lg:col-span-6 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <h3 class="font-bold text-slate-900 text-base mb-4">Departmental Average Attendance</h3>
                <div class="h-64">
                    <canvas id="chart-admin-attendance"></canvas>
                </div>
            </div>
            <div class="lg:col-span-6 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <h3 class="font-bold text-slate-900 text-base mb-4">Fee Reconciliation Overview</h3>
                <div class="h-64">
                    <canvas id="chart-admin-fee"></canvas>
                </div>
            </div>
        </div>
    `;
}

function renderAnnouncementsTab() {
    return `
        <div class="space-y-4 max-w-4xl mx-auto">
            ${appData.notices.map(n => `
                <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
                    <div class="flex items-center justify-between">
                        <span class="${n.category === 'Urgent' ? 'badge-danger' : n.category === 'Exam' ? 'badge-info' : 'badge-warning'} text-xs font-bold px-2.5 py-1 rounded-full">${n.category}</span>
                        <span class="text-xs text-slate-400">${n.date}</span>
                    </div>
                    <h4 class="font-bold text-slate-900 text-base">${n.title}</h4>
                    <p class="text-xs text-slate-600 leading-relaxed">${n.content}</p>
                    <div class="pt-2 border-t border-slate-100 text-[11px] text-slate-400 flex justify-between">
                        <span>Issued by: ${n.author}</span>
                        <span>Audience: ${n.target}</span>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

/* ========================================== */
/* CRUD & INTERACTIVE HANDLERS                */
/* ========================================== */

function filterStudentTable() {
    const searchVal = document.getElementById('admin-search-input').value.toLowerCase();
    const deptVal = document.getElementById('admin-dept-filter').value;
    const semVal = document.getElementById('admin-sem-filter').value;

    const filtered = appData.students.filter(s => {
        const matchesSearch = s.name.toLowerCase().includes(searchVal) || s.rollNo.toLowerCase().includes(searchVal) || s.email.toLowerCase().includes(searchVal);
        const matchesDept = deptVal === 'All' || s.department === deptVal;
        const matchesSem = semVal === 'All' || s.semester === semVal;
        return matchesSearch && matchesDept && matchesSem;
    });

    const tbody = document.getElementById('admin-student-tbody');
    if (tbody) {
        tbody.innerHTML = filtered.map(s => `
            <tr class="hover:bg-slate-50/80">
                <td class="p-4 flex items-center gap-3">
                    <img src="${s.photo}" class="w-9 h-9 rounded-full object-cover">
                    <div>
                        <span class="font-bold text-slate-900 block">${s.name}</span>
                        <span class="text-[11px] text-slate-400">${s.email}</span>
                    </div>
                </td>
                <td class="p-4 font-bold text-slate-800">${s.rollNo}</td>
                <td class="p-4">
                    <span class="font-semibold block text-slate-800">${s.department}</span>
                    <span class="text-[10px] text-slate-400">${s.semester}</span>
                </td>
                <td class="p-4 font-bold ${s.attendance >= 75 ? 'text-emerald-600' : 'text-rose-600'}">${s.attendance}%</td>
                <td class="p-4 font-extrabold text-blue-600">${s.gpa}</td>
                <td class="p-4">
                    <span class="${s.feeStatus === 'Paid' ? 'badge-success' : s.feeStatus === 'Pending' ? 'badge-warning' : 'badge-danger'} text-[10px] font-bold px-2.5 py-1 rounded-full">${s.feeStatus}</span>
                </td>
                <td class="p-4 text-right space-x-2">
                    <button onclick="openStudentProfileModal('${s.id}')" class="text-blue-600 hover:text-blue-800 p-1.5 rounded-lg hover:bg-blue-50" title="View Profile">
                        <i class="fa-solid fa-eye"></i>
                    </button>
                    <button onclick="openEditStudentModal('${s.id}')" class="text-amber-600 hover:text-amber-800 p-1.5 rounded-lg hover:bg-amber-50" title="Edit Record">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button onclick="deleteStudent('${s.id}')" class="text-rose-600 hover:text-rose-800 p-1.5 rounded-lg hover:bg-rose-50" title="Delete Student">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }
}

function openAddStudentModal() {
    document.getElementById('modal-student-title').textContent = 'Add New Student Record';
    document.getElementById('student-form-id').value = '';
    document.getElementById('student-form-name').value = '';
    document.getElementById('student-form-roll').value = `CS2026-${Math.floor(100 + Math.random() * 900)}`;
    document.getElementById('student-form-email').value = '';
    document.getElementById('student-form-phone').value = '';
    document.getElementById('modal-student-form').classList.remove('hidden');
}

function openEditStudentModal(id) {
    const student = appData.students.find(s => s.id === id);
    if (!student) return;

    document.getElementById('modal-student-title').textContent = 'Edit Student Record';
    document.getElementById('student-form-id').value = student.id;
    document.getElementById('student-form-name').value = student.name;
    document.getElementById('student-form-roll').value = student.rollNo;
    document.getElementById('student-form-dept').value = student.department;
    document.getElementById('student-form-sem').value = student.semester;
    document.getElementById('student-form-email').value = student.email;
    document.getElementById('student-form-phone').value = student.phone || '';
    document.getElementById('student-form-gpa').value = student.gpa;
    document.getElementById('student-form-att').value = student.attendance;
    document.getElementById('student-form-fee').value = student.feeStatus;

    document.getElementById('modal-student-form').classList.remove('hidden');
}

function handleSaveStudent(e) {
    e.preventDefault();
    const id = document.getElementById('student-form-id').value;
    const name = document.getElementById('student-form-name').value;
    const rollNo = document.getElementById('student-form-roll').value;
    const department = document.getElementById('student-form-dept').value;
    const semester = document.getElementById('student-form-sem').value;
    const email = document.getElementById('student-form-email').value;
    const phone = document.getElementById('student-form-phone').value;
    const gpa = parseFloat(document.getElementById('student-form-gpa').value);
    const attendance = parseInt(document.getElementById('student-form-att').value);
    const feeStatus = document.getElementById('student-form-fee').value;

    if (id) {
        // Edit existing
        const idx = appData.students.findIndex(s => s.id === id);
        if (idx !== -1) {
            appData.students[idx] = {
                ...appData.students[idx],
                name, rollNo, department, semester, email, phone, gpa, attendance, feeStatus
            };
        }
        showToast('Student record updated successfully!', 'success');
    } else {
        // Add new
        const newStudent = {
            id: `STU-${Date.now()}`,
            name, rollNo, department, semester, email, phone, gpa, attendance, feeStatus,
            status: 'Active',
            photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'
        };
        appData.students.unshift(newStudent);
        showToast('New student profile created!', 'success');
    }

    saveAppData(appData);
    closeModal('modal-student-form');
    showRoleTab('admin-students');
}

function deleteStudent(id) {
    if (confirm('Are you sure you want to delete this student record?')) {
        appData.students = appData.students.filter(s => s.id !== id);
        saveAppData(appData);
        showToast('Student record deleted.', 'warning');
        showRoleTab('admin-students');
    }
}

function openStudentProfileModal(id) {
    const s = appData.students.find(stu => stu.id === id) || appData.currentUser;
    document.getElementById('profile-modal-photo').src = s.photo;
    document.getElementById('profile-modal-name').textContent = s.name;
    document.getElementById('profile-modal-roll').textContent = `Roll No: ${s.rollNo}`;
    document.getElementById('profile-modal-dept').textContent = s.department;
    document.getElementById('profile-modal-sem').textContent = s.semester;
    document.getElementById('profile-modal-gpa').textContent = s.gpa;
    document.getElementById('profile-modal-attendance').textContent = `${s.attendance}%`;
    document.getElementById('profile-modal-fee').textContent = s.feeStatus;
    document.getElementById('profile-modal-status').textContent = s.status || 'Active';
    document.getElementById('profile-modal-email').textContent = s.email;
    document.getElementById('profile-modal-phone').textContent = s.phone;
    document.getElementById('profile-modal-guardian').textContent = s.guardian || 'N/A';

    document.getElementById('modal-student-profile').classList.remove('hidden');
}

function openFeePayModal(id, desc, amount) {
    document.getElementById('fee-pay-invoice-id').value = id;
    document.getElementById('fee-pay-desc').textContent = desc;
    document.getElementById('fee-pay-amount').textContent = `$${amount}.00`;
    document.getElementById('modal-fee-pay').classList.remove('hidden');
}

function handleFeePaymentSubmit(e) {
    e.preventDefault();
    const invId = document.getElementById('fee-pay-invoice-id').value;
    const inv = appData.fees.find(f => f.id === invId);
    if (inv) {
        inv.status = 'Paid';
        inv.paidAmount = inv.amount;
        inv.receiptNo = `REC-${Math.floor(10000 + Math.random() * 90000)}`;
        inv.paymentDate = new Date().toISOString().split('T')[0];
    }
    appData.currentUser.feeStatus = 'Paid';
    saveAppData(appData);
    closeModal('modal-fee-pay');
    showToast('Payment successful! Invoice receipt generated.', 'success');
    showRoleTab('student-fees');
}

function downloadFeeReceipt(invId) {
    const inv = appData.fees.find(f => f.id === invId);
    const content = `=================================================\n` +
                    `APEX INSTITUTE OF TECHNOLOGY & SCIENCE\n` +
                    `OFFICIAL FEE PAYMENT RECEIPT\n` +
                    `=================================================\n\n` +
                    `Receipt No: ${inv ? inv.receiptNo : 'REC-99430'}\n` +
                    `Student: ${appData.currentUser.name} (${appData.currentUser.rollNo})\n` +
                    `Description: ${inv ? inv.description : 'Tuition Fee'}\n` +
                    `Amount Paid: $${inv ? inv.amount : 4500}.00\n` +
                    `Payment Date: ${inv ? inv.paymentDate : '2026-09-17'}\n` +
                    `Status: CLEARED & VERIFIED\n\n` +
                    `Thank you for your payment.\n`;
    triggerBlobDownload(`Receipt_${invId}.txt`, content, 'text/plain');
    showToast('Fee Receipt downloaded to device.', 'info');
}

function downloadStudyMaterial(id) {
    const mat = appData.studyMaterials.find(m => m.id === id);
    const content = mat ? mat.content : 'Apex Study Document';
    triggerBlobDownload(`${mat ? mat.title.replace(/\s+/g, '_') : 'Study_Material'}.txt`, content, 'text/plain');
    showToast('Study Material downloading...', 'success');
}

function downloadTranscript() {
    window.print();
}

function triggerBlobDownload(filename, text, contentType) {
    const blob = new Blob([text], { type: contentType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function handleAssignmentSubmitModal(id) {
    const asn = appData.assignments.find(a => a.id === id);
    if (asn) {
        asn.status = 'Submitted';
        asn.submittedOn = new Date().toISOString().split('T')[0];
        asn.grade = 'Pending Evaluation';
        saveAppData(appData);
        showToast(`Assignment "${asn.title}" solution uploaded successfully!`, 'success');
        showRoleTab('student-assignments');
    }
}

function handleFacultyUploadMaterial(e) {
    e.preventDefault();
    const title = document.getElementById('faculty-upload-title').value;
    const courseCode = document.getElementById('faculty-upload-course').value;
    const category = document.getElementById('faculty-upload-cat').value;

    const newMat = {
        id: `MAT-${Date.now()}`,
        title, courseCode, category,
        author: 'Dr. Robert Vance',
        uploadDate: new Date().toISOString().split('T')[0],
        fileSize: '3.2 MB',
        type: 'pdf',
        content: `Document: ${title}\nCourse: ${courseCode}\nAuthor: Dr. Robert Vance`
    };

    appData.studyMaterials.unshift(newMat);
    saveAppData(appData);
    showToast('Material published & notifications dispatched!', 'success');
    showRoleTab('student-materials');
}

function handleAdminBroadcastNotice(e) {
    e.preventDefault();
    const title = document.getElementById('notice-form-title').value;
    const category = document.getElementById('notice-form-cat').value;
    const target = document.getElementById('notice-form-target').value;
    const content = document.getElementById('notice-form-content').value;

    const newNotice = {
        id: `NOT-${Date.now()}`,
        title, category, priority: 'High', target,
        date: new Date().toISOString().split('T')[0],
        author: 'Academic Registrar',
        content, read: false
    };

    appData.notices.unshift(newNotice);
    saveAppData(appData);
    showToast('Official circular broadcasted to portal!', 'success');
    renderNotifications();
    showRoleTab('announcements');
}

function setRosterStatus(idx, status) {
    const btnPres = document.getElementById(`att-pres-${idx}`);
    const btnAbs = document.getElementById(`att-abs-${idx}`);
    const btnLate = document.getElementById(`att-late-${idx}`);

    [btnPres, btnAbs, btnLate].forEach(b => {
        b.className = 'px-3 py-1 rounded-lg text-slate-600';
    });

    if (status === 'Present') {
        btnPres.className = 'px-3 py-1 rounded-lg bg-emerald-600 text-white shadow-xs';
    } else if (status === 'Absent') {
        btnAbs.className = 'px-3 py-1 rounded-lg bg-rose-600 text-white shadow-xs';
    } else if (status === 'Late') {
        btnLate.className = 'px-3 py-1 rounded-lg bg-amber-500 text-white shadow-xs';
    }
}

function markAllAttendance(status) {
    showToast(`Marked all students as ${status}`, 'info');
}

function saveAttendanceRoster() {
    showToast('Attendance sheet saved and synced with student analytics!', 'success');
}

/* ========================================== */
/* NOTIFICATIONS & TOAST SYSTEM              */
/* ========================================== */

function toggleNotificationDropdown() {
    const dropdown = document.getElementById('notif-dropdown');
    dropdown.classList.toggle('hidden');
}

function renderNotifications() {
    const container = document.getElementById('notif-list-container');
    const badge = document.getElementById('unread-notif-badge');
    const unread = appData.notices.filter(n => !n.read);

    if (badge) {
        badge.textContent = unread.length;
        if (unread.length === 0) badge.classList.add('hidden');
        else badge.classList.remove('hidden');
    }

    if (container) {
        container.innerHTML = appData.notices.map(n => `
            <div class="p-3.5 hover:bg-slate-50 transition flex items-start gap-3 text-xs">
                <div class="w-8 h-8 rounded-full ${n.category === 'Urgent' ? 'bg-rose-100 text-rose-600' : 'bg-blue-100 text-blue-600'} flex items-center justify-center flex-shrink-0 mt-0.5">
                    <i class="fa-solid ${n.category === 'Urgent' ? 'fa-triangle-exclamation' : 'fa-bullhorn'}"></i>
                </div>
                <div class="space-y-1">
                    <h5 class="font-bold text-slate-900 leading-snug">${n.title}</h5>
                    <p class="text-slate-500 text-[11px] line-clamp-2">${n.content}</p>
                    <span class="text-[10px] text-slate-400 block">${n.date}</span>
                </div>
            </div>
        `).join('');
    }
}

function markAllNotificationsRead() {
    appData.notices.forEach(n => n.read = true);
    saveAppData(appData);
    renderNotifications();
    showToast('All notifications marked as read', 'info');
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    
    const bgColor = type === 'success' ? 'bg-emerald-600' : type === 'warning' ? 'bg-amber-600' : type === 'rose' ? 'bg-rose-600' : 'bg-slate-900';
    const icon = type === 'success' ? 'fa-circle-check' : type === 'warning' ? 'fa-triangle-exclamation' : 'fa-circle-info';

    toast.className = `${bgColor} text-white px-4 py-3 rounded-2xl shadow-2xl text-xs font-semibold flex items-center gap-3 transition transform translate-y-4 pointer-events-auto border border-white/10`;
    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
    
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

function openAuthModal() {
    document.getElementById('modal-auth').classList.remove('hidden');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}

function setAuthRole(role) {
    ['student', 'faculty', 'admin'].forEach(r => {
        const tab = document.getElementById(`auth-tab-${r}`);
        if (tab) {
            tab.className = r === role ? 'flex-1 py-2 text-blue-600 border-b-2 border-blue-600 font-bold' : 'flex-1 py-2 text-slate-500 hover:text-slate-800';
        }
    });
}

function handleLoginSubmit(e) {
    e.preventDefault();
    const userId = document.getElementById('auth-input-id').value;
    closeModal('modal-auth');
    if (userId.startsWith('STU') || userId.startsWith('CS')) {
        switchRole('student');
    } else if (userId.startsWith('FAC')) {
        switchRole('faculty');
    } else {
        switchRole('admin');
    }
    showToast(`Signed in successfully as ${userId}`, 'success');
}
