
lock "~> 3.14.1"

set :application, "my-team-builder"
set :repo_url, "git@github.com:canriquez/my-team-builder.git"
set :ssh_options, { :forward_agent => true }
set :npm_flags, '--silent --no-progress'

namespace :deploy do
    desc 'Restart application'
    task :restart do
      invoke 'react:build'
    end   
end

after 'deploy:publishing', 'deploy:restart'

