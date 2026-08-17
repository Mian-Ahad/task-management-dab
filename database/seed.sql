USE TaskManagement;
GO

INSERT INTO dbo.Users (Name, Email)
VALUES
('Muhammad Ahad', 'ahad@example.com'),
('Ali Khan', 'ali@example.com'),
('Usman Ahmed', 'usman@example.com');
GO

INSERT INTO dbo.Tasks
    (UserId, Title, Description, Status)
VALUES
(
    1,
    'Learn Docker',
    'Complete Docker fundamentals and containerization.',
    'Completed'
),
(
    1,
    'Configure DAB',
    'Connect Data API Builder with SQL Server.',
    'In Progress'
),
(
    2,
    'Test REST API',
    'Test Users, Tasks and Comments endpoints.',
    'Pending'
);
GO

INSERT INTO dbo.Comments
    (TaskId, UserId, CommentText)
VALUES
(
    1,
    1,
    'Docker fundamentals completed successfully.'
),
(
    2,
    1,
    'DAB configuration is ready for testing.'
),
(
    3,
    2,
    'REST API testing is the next step.'
);
GO