import os
from fabric.api import local
from fabric.context_managers import cd


def download(path, config_filename='config.json'):
    path = os.path.abspath(path)
    config_path = os.path.join(path, config_filename)
    dest_path = os.path.join(path, 'repos')
    if not os.path.exists(dest_path):
        # create repos directory if it does not exists
        print 'Creating Repos Directory'
        local('mkdir {}'.format(dest_path))
    with open(config_path, 'r') as f:
        student_info = f.readline().strip()
        while student_info:
            name, repo = student_info.split(',')
            name = name.replace(' ', '_')
            result_path = os.path.join(dest_path, name)
            if os.path.exists(result_path):
                print 'Deleting ' + result_path
                local('rm -rf {}'.format(result_path))
            # clone repo
            local('git clone {} {}'.format(repo, result_path))
            student_info = f.readline().strip()
