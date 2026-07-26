<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

$dir  = __DIR__ . '/projects/';
$file = $dir . 'project.json';

if (!is_dir($dir)) mkdir($dir, 0755, true);
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit; }

// LOAD
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['load'])) {
    if (file_exists($file)) {
        echo json_encode([
            'success' => true,
            'data' => json_decode(file_get_contents($file), true)
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'No project']);
    }
    exit;
}

// SAVE
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (!$data) { echo json_encode(['success' => false]); exit; }

    // Sanitize scripts
    if (isset($data['html'])) {
        $data['html'] = preg_replace(
            '/<script\b[^>]*>(.*?)<\/script>/is', '', $data['html']
        );
    }

    $data['savedAt'] = date('Y-m-d H:i:s');

    // Backup
    if (file_exists($file)) {
        copy($file, $dir . 'backup_' . date('Ymd_His') . '.json');
        $backups = glob($dir . 'backup_*.json');
        if (count($backups) > 10) {
            usort($backups, fn($a, $b) => filemtime($a) - filemtime($b));
            array_map('unlink', array_slice($backups, 0, -10));
        }
    }

    $ok = file_put_contents(
        $file,
        json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
    );

    echo json_encode([
        'success'  => $ok !== false,
        'savedAt' => $data['savedAt']
    ]);
    exit;
}

echo json_encode(['success' => false, 'message' => 'Invalid request']);