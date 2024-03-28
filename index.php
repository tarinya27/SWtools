<?php
require_once "app/init.php";
require_once "app/backend/user/User.php";
require_once "app/backend/user/UserType.php";
require_once "app/backend/blob/Blob.php";
require_once "app/backend/extractors.php";
session_start();

$user = extractUser($_SESSION);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <title>Home | AMS</title>
    <?php include "app/frontend/includes/head.php" ?>
    <link rel="stylesheet" href="<?php echo PUBLIC_CSS ?>index.css">
</head>
<body>
<?php include "app/frontend/ui/topbar.php" ?>
<?php include "app/frontend/ui/alerts.php" ?>
<div class="banner-container">
    <div class="banner-text">
        <div class="title">
            <div class="segment">Accommodation</div>
            <div class="segment">Management</div>
            <div class="segment">System</div>
        </div>
        <div class="button-container">
            <?php
            if (is_null($user)) {
                echo '<a class="button" href="' . BASE_URL . 'login.php">Log in</a>
                      <a class="button" href="' . BASE_URL . 'register.php">Register for landlord</a>';
            } else {
                echo '<a class="button" href="' . $user->getDashboardUrl() . '">Goto dashboard</a>';
            }
            ?>
        </div>
    </div>
    <svg class="banner-image" viewBox="0 0 10 7" preserveAspectRatio="xMidYMid slice"
         xmlns="http://www.w3.org/2000/svg">
        <image height="7" width="10" href="<?php echo PUBLIC_ASSETS ?>svg/front-banner.svg"/>
    </svg>
</div>
<?php include "app/frontend/ui/statusbar.php" ?>
</body>
</html>