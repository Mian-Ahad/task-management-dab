USE TaskManagement;
GO

IF OBJECT_ID('dbo.Comments', 'U') IS NOT NULL
    DROP TABLE dbo.Comments;
GO

IF OBJECT_ID('dbo.Tasks', 'U') IS NOT NULL
    DROP TABLE dbo.Tasks;
GO

IF OBJECT_ID('dbo.Users', 'U') IS NOT NULL
    DROP TABLE dbo.Users;
GO

CREATE TABLE dbo.Users
(
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Email NVARCHAR(255) NOT NULL UNIQUE,
    CreatedAt DATETIME2 DEFAULT GETUTCDATE()
);
GO

CREATE TABLE dbo.Tasks
(
    Id INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL,
    Title NVARCHAR(200) NOT NULL,
    Description NVARCHAR(MAX),
    Status NVARCHAR(50) DEFAULT 'Pending',
    CreatedAt DATETIME2 DEFAULT GETUTCDATE(),

    CONSTRAINT FK_Tasks_Users
        FOREIGN KEY (UserId)
        REFERENCES dbo.Users(Id)
);
GO

CREATE TABLE dbo.Comments
(
    Id INT IDENTITY(1,1) PRIMARY KEY,
    TaskId INT NOT NULL,
    UserId INT NOT NULL,
    CommentText NVARCHAR(MAX) NOT NULL,
    CreatedAt DATETIME2 DEFAULT GETUTCDATE(),

    CONSTRAINT FK_Comments_Tasks
        FOREIGN KEY (TaskId)
        REFERENCES dbo.Tasks(Id),

    CONSTRAINT FK_Comments_Users
        FOREIGN KEY (UserId)
        REFERENCES dbo.Users(Id)
);
GO