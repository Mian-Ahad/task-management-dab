INSERT INTO Users (FullName, Email)
VALUES
('Ahmad', 'ahmad@example.com'),
('Ahad', 'Ahad@example.com'),
('Hamza ', 'hamza@example.com'),
('Akber', 'akber@example.com'),
('Usman ', 'usman@example.com');


INSERT INTO Categories (CategoryName, Description)
VALUES
('Development', 'Software development tasks'),
('DevOps', 'DevOps and cloud-related tasks'),
('Study', 'University and learning tasks'),
('Personal', 'Personal activities'),
('Work', 'Professional work tasks');


INSERT INTO Tasks
    (Title, Description, Status, Priority, DueDate, UserID, CategoryID)
VALUES
(
    'Build REST API',
    'Create the task management REST API',
    'In Progress',
    'High',
    '2026-08-25',
    1,
    1
),
(
    'Learn Docker',
    'Practice Docker containers and images',
    'Completed',
    'Medium',
    '2026-08-20',
    2,
    2
),
(
    'Complete Database Assignment',
    'Finish the Azure SQL database assignment',
    'Pending',
    'High',
    '2026-08-22',
    3,
    3
),
(
    'Gym Workout',
    'Complete weekly workout',
    'Pending',
    'Low',
    '2026-08-18',
    4,
    4
),
(
    'Prepare Project Report',
    'Prepare documentation for the project',
    'In Progress',
    'Medium',
    '2026-08-28',
    5,
    5
);