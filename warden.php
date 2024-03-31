<?php
global $conn;
require_once "app/init.php";
require_once "app/backend/config.php";
require_once "app/backend/user/User.php";
require_once "app/backend/user/UserType.php";
require_once "app/backend/blob/Blob.php";
require_once "app/backend/advertisement/helpers.php";
require_once "app/backend/request/helpers.php";
require_once "app/backend/auth.php";
require_once "app/backend/helpers.php";
require_once "app/backend/extractors.php";
require_once "app/backend/validators.php";
require_once "app/backend/utilities.php";
require_once "app/backend/Status.php";
session_start();

$user = extractUser($_SESSION);

allowOnlyUserTypes($user, UserType::Warden);

$searchQuery = $_GET['searchQuery'] ?? null;
$searchStatus = $_GET['searchStatus'] ?? null;

try {
    if ($searchStatus !== null) {
        $status = Status::from($searchStatus);
    } else {
        $status = Status::Accepted;
    }
} catch (Exception $e) {
    insertError($_SESSION, $e->getMessage());
    redirectUsingUrlParam($user->getDashboardUrl());
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <title>Warden | AMS</title>
    <?php include "app/frontend/includes/head.php" ?>
    <link rel="stylesheet" href="<?php echo PUBLIC_CSS ?>topbar.css">
    <link rel="stylesheet" href="<?php echo PUBLIC_CSS ?>statusbar.css">
    <link rel="stylesheet" href="<?php echo PUBLIC_CSS ?>app.css">
</head>
<body>
<div class="app-wrapper">
    <?php include "app/frontend/ui/topbar.php"; ?>
    <?php include "app/frontend/ui/alerts.php" ?>
    <div class="app">
        <div class="container">
            <div class="title-bar">
                <div class="title">Advertisements</div>
                <form class="search" action="<?php echo BASE_URL ?>warden.php" method="get">
                    <div class="input-container">
                        <label for="searchQuery">Search</label>
                        <input type="text" id="searchQuery" name="searchQuery" value="<?php echo $searchQuery ?? '' ?>">
                    </div>
                    <div class="input-container">
                        <label for="searchStatus">Status</label>
                        <select name="searchStatus" id="searchStatus">
                            <?php
                            foreach (Status::cases() as $s) {
                                echo '<option value="' . $s->value . '" ' . ($status->value === $s->value ? "Selected>" : ">") . $s->name . '</option>';
                            }
                            ?>
                        </select>
                    </div>
                    <button type="submit">Search</button>
                </form>
            </div>
            <div class="map-container">
                <div id="map" class="map" style="height: 30em"></div>
                <div id="map-info" class="hidden">
                    <img id="map-info-thumbnail" class="thumbnail" src="" alt="thumbnail">
                    <a id="map-info-url" class="title">
                        <div id="map-info-title"></div>
                    </a>
                    <div id="map-info-description" class="description"></div>
                    <div class="last-edited">Last Edited: <span id="map-info-last-edited"></span></div>
                    <div class="status">Status: <span id="map-info-status"></span></div>
                </div>
            </div>
            <div class="empty-display">No advertisements to display</div>
            <?php
            foreach (searchAdvertisements($searchQuery, $status ?? Status::Accepted, $conn) as $advertisement) {
                echo '
                <div class="map-item" 
                data-lat="' . $advertisement->getLatitude() . '" 
                data-lng="' . $advertisement->getLongitude() . '"
                data-title="' . $advertisement->getTitle() . '"
                data-description="' . $advertisement->getDescription() . '"
                data-thumbnail="' . $advertisement->getThumbnail()->getDataUri() . '"
                data-last-edited="' . $advertisement->getLastEdited() . '"
                data-status="' . $advertisement->getStatus()->name . '"
                data-url="' . BASE_URL . 'advertisement.php?action=view&id=' . $advertisement->getId() . '"
                >';
                include "app/frontend/ui/advertisement.php";
                echo '</div>';
            }
            ?>
        </div>
    </div>
    <?php include "app/frontend/ui/statusbar.php" ?>
</div>
<script src="public/js/warden.js"></script>
</body>
</html>
